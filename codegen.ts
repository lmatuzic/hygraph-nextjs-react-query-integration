import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: `${process.env.HYGRAPH_CONTENT_API}`,
	documents: ['app/**/*.{ts, tsx, js, jsx}'],
	ignoreNoDocuments: true,
	generates: {
		'./app/lib/graphql-codegen/': {
			preset: 'client',
			plugins: [],
		},
	},
};

export default config;
