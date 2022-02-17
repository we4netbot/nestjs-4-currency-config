import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRefTypeEnum } from 'src/enums/event-ref-type.enum';
import { EventTypesEnum } from 'src/enums/event-types.enum';
import { EventEntity} from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';
import { Connection, Repository } from 'typeorm';
import { CURRENCY_SIGN } from './constans/token.constans';
import { CreatePostDto } from './dtos/create-post.dto';
import { PaginationDto } from './dtos/pagination.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CategoryEntity } from './entities/category.entity';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('MAIL_API')
    private readonly mailAPI: string,
    @Inject(CURRENCY_SIGN)
    private readonly currencySign: string,
    @InjectRepository(PostEntity) //CRUD intace & by postEntity
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(EventEntity)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly connection: Connection,
    private readonly eventservice: EventService,
  ) {
    console.log(`PostService: constructor, mail api: ${mailAPI}`);
    console.log(`Currency sign: constructor, Currency sign : ${this.currencySign}`);
  }
  findAll(pagination?: PaginationDto) {
    return this.postRepository.find({
      relations: ['categories'],
      skip: pagination.page * pagination.pagecount,
      take: pagination.pagecount,
    });
  }

  findOne(id: number) {
    return this.postRepository.findOne(id, {
      relations: ['categories'],
    });
  }

  async perloadCtegory(_item) {
    const category = await this.categoryRepository.findOne({
      where: {
        name: _item,
      },
    });
    if (category) {
      return category;
    } else {
      return this.categoryRepository.create({ name: _item });
    }
  }

  async create(body: CreatePostDto) {
    const categories = await Promise.all(
      body.categories.map((_item) => {
        return this.perloadCtegory(_item);
      }),
    );
    const post = this.postRepository.create({
      ...body,
      categories,
    });
    return this.postRepository.save(post);
  }

  async update(id: number, body: UpdatePostDto) {
    const categories = await Promise.all(
      body.categories.map((_item) => {
        return this.perloadCtegory(_item);
      }),
    );
    const post = await this.postRepository.preload({
      id: id,
      ...body,
      categories,
    });
    if (!post) {
      throw new NotFoundException(`post not found! (id:${id})`);
    }
    return this.postRepository.save(post);
  }

  async goEvents(userid: number, type: EventTypesEnum, id: number, content?: string) {
    const queryRunner = this.connection.createQueryRunner();
    let post = await this.findOne(id);
    let event = await this.eventservice.getEventByUser(post.id, EventRefTypeEnum.Post, userid, EventTypesEnum.liked)
    if(event.length > 0){
      throw new BadRequestException('this user liked this post befor')
    }
    if (type == EventTypesEnum.liked) {
      post.likecount++;
    }
    if(type == EventTypesEnum.commented){
      post.comments.push(content)
    }
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      post = await queryRunner.manager.save(post);
      const event = this.eventRepository.create({
        massage: type,
        content: content,
        refid: post.id,
        reftype: EventRefTypeEnum.Post,
      });
      await queryRunner.manager.save(event);
      await queryRunner.commitTransaction();
      return post;
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async delete(id: number) {
    const post = await this.findOne(id);
    this.postRepository.remove(post);

    return post;
  }
}
