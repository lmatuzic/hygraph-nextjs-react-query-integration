'use client';

import { Button } from '@/app/(ui)/components/shadcn/Button';
import { Card, CardContent } from '@/app/(ui)/components/shadcn/Card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/app/(ui)/components/shadcn/Form';
import { Input } from '@/app/(ui)/components/shadcn/Input';
import { Textarea } from '@/app/(ui)/components/shadcn/Textarea';
import { DatePicker } from '@/app/(ui)/components/shared/DatePicker';
import { dinnerReservationFormSchema } from '@/app/lib/zod/schemas/dinnerReservationFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { sendReservationEmail } from '../../actions/sendEmail';

export default function DinnerReservationForm() {
	const form = useForm<z.infer<typeof dinnerReservationFormSchema>>({
		resolver: zodResolver(dinnerReservationFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			numberOfPeople: 1,
			phone: '',
			reservationDate: new Date(),
			message: '',
		},
	});

	const onSubmit = (values: z.infer<typeof dinnerReservationFormSchema>) => {
		sendReservationEmail();
		console.log(values);
	};

	return (
		<Card className='w-full col-span-1'>
			<CardContent className='mt-4'>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Ime</FormLabel>
									<FormControl>
										<Input type='text' placeholder='First name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Prezime</FormLabel>
									<FormControl>
										<Input type='text' placeholder='Last name' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='Email' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='phone'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Telefon / mobitel</FormLabel>
									<FormControl>
										<Input type='tel' placeholder='Phone' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='numberOfPeople'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Broj ljudi</FormLabel>
									<FormControl>
										<Input min={1} placeholder='Number of people' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='reservationDate'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Datum</FormLabel>
									<FormControl>
										<div className='w-full'>
											<DatePicker />
										</div>
									</FormControl>
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='message'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Poruka</FormLabel>
									<FormControl>
										<Textarea rows={7} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type='submit' className='text-white'>
							Rezerviraj
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
