'use client';

import { useActionState, useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupCreateForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState('');

  const { toast } = useToast();
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === 'SUCCESS') {
        toast({
          title: 'success',
          description: 'submit successful',
        });

        router.push(`/startup/${result._id}`);

        return result;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: 'error',
          description: 'validation failed',
          variant: 'destructive',
        });

        return { ...prevState, error: 'validation failed', status: 'ERROR' };
      }
      toast({
        title: 'error',
        description: 'unexpected error',
        variant: 'destructive',
      });

      return { ...prevState, error: 'unexpected error', status: 'ERROR' };
    }
  };

  const [, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'initial',
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <Label htmlFor="title" className="startup-form_label">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <Label htmlFor="description" className="startup-form_label">
          Description
        </Label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <Label htmlFor="category" className="startup-form_label">
          Category
        </Label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup category (tech, health, education...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <Label htmlFor="link" className="startup-form_label">
          Image URL
        </Label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <Label htmlFor="pitch" className="startup-form_label">
          Pitch
        </Label>
        <MDEditor
          value={pitch}
          onChange={(v) => setPitch(v as string)}
          id="pitch"
          preview="edit"
          height="100%"
          minHeight={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: 'Startup pitch',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />

        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? 'Submitting...' : 'Submit'}
        <Send className="size-6 ml-2 " />
      </Button>
    </form>
  );
};
export default StartupCreateForm;
