import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './Entities/User';
import { EPossibleIsMultipleOptions } from './types/user.types';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userSerice: UsersService){}
    
    @ApiOkResponse({type: User, isArray: true})
    @Get()
    public getUsers(){
        return this.userSerice.getUsers()
    }

    
    @Get('/filtered')
    @ApiQuery({name: 'term', required: false })
    @ApiQuery({name: "multiple", required: false, enum: ["yes", "no"]})
    public getFiltered(@Query('term') term?: string, @Query('multiple') multiple?: EPossibleIsMultipleOptions){
        const isMultiple: boolean = (multiple && multiple === EPossibleIsMultipleOptions.yes) || false;
        const searchTerm = term || "";
        return this.userSerice.getUserBySearchTerm(isMultiple, searchTerm);
    }

    @ApiOkResponse({type: User})
    @ApiNotFoundResponse({description: "User not found with the specific id"})
    @Get(':id')
    public getParticularUser(@Param('id', ParseIntPipe)id: number){
        const user =  this.userSerice.getParticularUser(id);
        if(!user){
            throw new NotFoundException()
        }
        return user;
    }

    @ApiCreatedResponse({type: User})
    @Post()
    public createNewUser(@Body() body: CreateUserDto){
        return this.userSerice.createMewUser(body);
    }
}
