'use client';

import { MenuCategoriesDocument } from '@/app/lib/graphql-codegen/graphql';
import { useQuery } from '@tanstack/react-query';
import request from 'graphql-request';

export default function useGetMenuCategories() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['menuCategories'],
		queryFn: async () => request(`${process.env.HYGRAPH_CONTENT_API}`, MenuCategoriesDocument),
	});

	return { data, isLoading, error };
}
