'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.instanceof(File, { message: 'Image is required' }),
  imageAlt: z.string().min(1, 'Image alt text is required'),
  demoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  infoUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  codeUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  date: z.string().min(1, 'Date is required'),
  author: z.string().min(1, 'Author is required'),
  tags: z.string().min(1, 'Tags are required'),
  hasDetails: z.boolean().default(false),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      imageAlt: '',
      demoUrl: '',
      infoUrl: '',
      codeUrl: '',
      date: '',
      author: '',
      tags: '',
      hasDetails: false,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProjectFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('image', data.image);
      formData.append('imageAlt', data.imageAlt);
      if (data.demoUrl) formData.append('demoUrl', data.demoUrl);
      if (data.infoUrl) formData.append('infoUrl', data.infoUrl);
      if (data.codeUrl) formData.append('codeUrl', data.codeUrl);
      formData.append('date', data.date);
      formData.append('author', data.author);
      formData.append('tags', data.tags);
      formData.append('hasDetails', data.hasDetails.toString());

      const response = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create project');
      }

      // Redirect to projects page
      router.push('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert(error instanceof Error ? error.message : 'Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-black mb-8">Add New Project</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Project title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Project Image *</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    {...field}
                    onChange={(e) => {
                      handleImageChange(e);
                      onChange(e.target.files?.[0]);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload an image for your project. It will be stored on Cloudinary.
                </FormDescription>
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover border"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Alt Text */}
          <FormField
            control={form.control}
            name="imageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image Alt Text *</FormLabel>
                <FormControl>
                  <Input placeholder="Description of the image" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date *</FormLabel>
                <FormControl>
                  <Input placeholder="Jan 2025" {...field} />
                </FormControl>
                <FormDescription>Format: Jan 2025, Dec 2024, etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author *</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags *</FormLabel>
                <FormControl>
                  <Input placeholder="React, Next.js, TypeScript" {...field} />
                </FormControl>
                <FormDescription>Comma-separated tags</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Demo URL */}
          <FormField
            control={form.control}
            name="demoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Demo URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/demo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Info URL */}
          <FormField
            control={form.control}
            name="infoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Info URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://example.com/info" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Code URL */}
          <FormField
            control={form.control}
            name="codeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code URL</FormLabel>
                <FormControl>
                  <Input type="url" placeholder="https://github.com/user/repo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Has Details */}
          <FormField
            control={form.control}
            name="hasDetails"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Has Details Page</FormLabel>
                  <FormDescription>
                    Check if this project has a detailed MDX page
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/projects')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

