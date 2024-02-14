import { Controller, Post, Get, UploadedFile, UseInterceptors, Query, Res, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { UploadDto } from './dto/upload.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload Image' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File): any {
    return this.uploadService.uploadS3(file);
  }

  @Get()
  @ApiOperation({ summary: 'Upload Image with url' })
  generateUrlUpload(@Query() uploadDto: UploadDto): any {
    return this.uploadService.generateToken(uploadDto);
  }

  @Post('image')
  @ApiOperation({ summary: 'Upload Image file server' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File): { filename: string; url: string } {
    const url = 'upload/' + file.filename;
    return { filename: file.filename, url };
  }

  @Get('/:filename')
  async serveImage(
    @Param('filename') filename: string,
    @Res() res: Response,
  ): Promise<Response<any, Record<string, any>>> {
    const imagePath = `./uploads/${filename}`;

    if (!fs.existsSync(imagePath)) {
      return res.status(404).send('Image not found');
    }

    res.sendFile(filename, { root: './uploads' });
  }
}
