import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';
import { fetchNotes } from '@/lib/api/serverApi';

type NotesByCategoryProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params;
  const category = slug?.[0];

  return {
    title: `${category} Notes`,
    description: `Read your ${category} notes`,
    openGraph: {
      title: `${category} Notes`,
      description: `Read your ${category} notes`,
      url: `https://08-zustand-tau-flax.vercel.app/notes/filter/${category}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub app',
        },
      ],
    },
  };
}

const NotesByCategory = async ({ params }: NotesByCategoryProps) => {
  const { slug } = await params;
  const category = slug?.[0];

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['notes', category],
    queryFn: () => fetchNotes(category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient category={category} />
    </HydrationBoundary>
  );
};

export default NotesByCategory;
