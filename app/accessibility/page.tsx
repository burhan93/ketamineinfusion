import LegalPage, { legalMetadata } from '@/components/LegalPage';
import { LEGAL_PAGES } from '@/lib/legal';

const page = LEGAL_PAGES['accessibility'];

export const metadata = legalMetadata(page);

export default function Page() {
  return <LegalPage page={page} />;
}
