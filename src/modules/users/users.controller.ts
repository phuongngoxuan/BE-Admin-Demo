import { Controller, Get, Param, Patch, Query, Post, Body, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/users.schema';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserByIdDto } from './dto/get-user-id.dto';
import { User } from '@sentry/node';
import { ResPagingDto } from 'src/shares/dtos/pagination.dto';
import { UserAuth } from 'src/shares/decorators/http.decorators';
import { UserRole } from 'src/shares/enums/user.enum';
import { IdDto, IdsDto } from 'src/shares/dtos/param.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  async findAll(@Query() query: GetUsersDto): Promise<ResPagingDto<User[]>> {
    return this.usersService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update User by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.findByIdAndUpdate(id, updateUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'The user has been successfully retrieved' })
  async findById(@Param() getUserByIdDto: GetUserByIdDto): Promise<User> {
    return this.usersService.findById(getUserByIdDto.id);
  }

  @Delete(':id')
  // @ApiBearerAuth()
  // @UserAuth([UserRole.ADMIN])
  @ApiOperation({ summary: 'Delete user by id' })
  async deleteOne(@Param() { id }: IdDto): Promise<void> {
    await this.usersService.deleteById(id);
  }

  @Delete()
  @ApiBearerAuth()
  // @UserAuth([UserRole.ADMIN])
  // @ApiOperation({ summary: '[ ADMIN ] delete many products' })
  async deleteMany(@Body() { ids }: IdsDto): Promise<void> {
    await this.usersService.deleteIds(ids);
  }
}
