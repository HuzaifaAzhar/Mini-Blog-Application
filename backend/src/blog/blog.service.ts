import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException('Post not found');
    return blog;
  }

  create(data: CreateBlogDto): Promise<Blog> {
    const post = this.blogRepository.create(data);
    return this.blogRepository.save(post);
  }

  async update(id: number, data: UpdateBlogDto): Promise<Blog> {
    const blog = await this.findOne(id);
    const updated = Object.assign(blog, data);
    return this.blogRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const blog = await this.findOne(id);
    await this.blogRepository.remove(blog);
  }
}
