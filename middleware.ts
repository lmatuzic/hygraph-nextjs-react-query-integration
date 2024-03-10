import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { i18n } from './i18.config';

function getLocale(request: NextRequest): string | undefined {
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	// @ts-ignore locales are readonly
	const locales: string[] = i18n.locales;
	let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

	const locale = matchLocale(languages, locales, i18n.defaultLocale);
	return locale;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	// Exclude specific paths from redirection, like robots.txt
	if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
		return NextResponse.next();
	}

	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
	);

	// Redirect if there is no locale
	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);

		return NextResponse.redirect(
			new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
		);
	}
}

export const config = {
	// Matcher ignoring `/_next/` and `/api/`
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
