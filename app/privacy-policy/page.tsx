import LegalPage, { legalMetadata } from '@/components/LegalPage';
import { PRIVACY_PAGE } from '@/lib/privacy';

export const metadata = legalMetadata(PRIVACY_PAGE);

export default function Page() {
  return <LegalPage page={PRIVACY_PAGE} />;
}
