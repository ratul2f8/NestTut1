import { ApiProperty } from "@nestjs/swagger";

export class User{
    @ApiProperty()
    name: string;
    @ApiProperty()
    id: number;

    constructor (name: string, id: number){
        this.name = name;
        this.id = id;
    }
}