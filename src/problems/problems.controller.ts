import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemStatusDto } from './dto/update-problem-status.dto';
import {Problem, TaskStatus} from "@prisma/client";
import {Display_problemsDto} from "./dto/display_problems.dto";
import {Display_TicketsDto} from "../tickets/dto/Display_Tickets.dto";
import {ApiTags} from "@nestjs/swagger";
import {StatusObject} from "./dto/StatusObject.dto";

@Controller('problem')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @Post('/add/:user_id')
  async create(@Param('user_id') user_id:string,@Body() createProblemDto: CreateProblemDto):Promise<Problem>  {
    return await this.problemsService.Crete_Problem(user_id,createProblemDto);
  }

  @Get()
  async findAll():Promise<Display_problemsDto[]> {
   return await this.problemsService.Display_All_Problem();
  }
  @Get('/list/notificationFalse')
  async find_Notification_False():Promise<Display_problemsDto[]> {
    return await this.problemsService.Display_Problems_Notification_False();
  }
  @Patch('/status/:Problem_Id')
  async updateStatus(@Param('Problem_Id') Problem_Id: string, @Body() statusObject: { status: TaskStatus }): Promise<boolean> {
    const { status } = statusObject;
    console.log("Data object is : "+statusObject);
    console.log("Data object is : "+status);
    const statusString = TaskStatus[status];
    console.log("\n\n\n" + statusString + "\n");
    if (statusString !== undefined) {
      return await this.problemsService.Update_Status_Problem(Problem_Id, statusString);
    } else {
      console.error('Invalid TaskStatus:', status);
      return false; // or handle the error appropriately
    }
  }
  @Patch('/status/notification/:Problem_Id')
  async updateNotification(@Param('Problem_Id') Problem_Id: string): Promise<boolean> {
    return await this.problemsService.Update_Status_Notification_Problem(Problem_Id);
  }

}
