import { ApiProperty } from "@nestjs/swagger";
import { MinLength, ValidationArguments } from "class-validator";

export class CreateUserDto{
    @MinLength(4, {
        message: (args: ValidationArguments) => {
            if(args.value.length  < 3){
                return "Name is too short"
            }
            if(args.value.length < 4){
                return "Name must be at least 4 characters long"
            }
            return ""
        }
    })
    @ApiProperty({required: true})
    name: string;
}