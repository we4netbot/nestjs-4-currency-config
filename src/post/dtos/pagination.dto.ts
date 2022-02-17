import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationDto {
    @IsOptional()
    page: number;

    @IsOptional()
    pagecount: number;
}
