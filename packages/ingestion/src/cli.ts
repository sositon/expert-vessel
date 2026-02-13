#!/usr/bin/env node
import { Command } from 'commander';

import { createServerServiceRoleClient } from '@repo/db';

import { chunkHebrewDocument } from './chunk.js';
import { ingestPdfDocument } from './ingest.js';
import { normalizeHebrewText } from './normalize-he.js';

const program = new Command();

program
  .name('ingestion')
  .description('Document ingestion and preprocessing CLI');

program
  .command('ingest')
  .requiredOption('--pdf-path <path>')
  .requiredOption('--doc-type <docType>')
  .requiredOption('--user-id <userId>')
  .option('--title <title>')
  .action(async (options) => {
    const client = createServerServiceRoleClient();
    const result = await ingestPdfDocument(client, {
      pdfPath: options.pdfPath,
      docType: options.docType,
      userId: options.userId,
      title: options.title,
    });

    console.log(JSON.stringify(result, null, 2));
  });

program
  .command('chunk')
  .requiredOption('--text <text>')
  .option('--max-tokens <maxTokens>', 'token budget', '350')
  .action((options) => {
    const chunks = chunkHebrewDocument(options.text, Number(options.maxTokens));
    console.log(JSON.stringify(chunks, null, 2));
  });

program
  .command('normalize-he')
  .requiredOption('--text <text>')
  .action((options) => {
    console.log(normalizeHebrewText(options.text));
  });

program.parseAsync(process.argv);
