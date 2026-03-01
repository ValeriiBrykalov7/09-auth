'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './NoteForm.module.css';
import { useId } from 'react';
import { useRouter } from 'next/navigation';
import type { NewNote } from '../../types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore';
import { createNote } from '@/lib/api/clientApi';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const handelCancel = () => router.push('/notes/filter/all');

  const fieldId = useId();

  const createNoteMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNote;
    createNoteMutation.mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          value={draft?.title || ''}
          type='text'
          name='title'
          className={css.input}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          value={draft?.content || ''}
          onChange={handleChange}
          name='content'
          rows={8}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          value={draft?.tag || 'Todo'}
          onChange={handleChange}
          id={`${fieldId}-tag`}
          name='tag'
          className={css.select}
        >
          <option value='Todo'>Todo</option>
          <option value='Work'>Work</option>
          <option value='Personal'>Personal</option>
          <option value='Meeting'>Meeting</option>
          <option value='Shopping'>Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          onClick={handelCancel}
          type='button'
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type='submit' className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
}
