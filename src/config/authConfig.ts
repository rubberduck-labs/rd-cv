import { Provider } from '@supabase/supabase-js';

export const ALLOWED_DOMAINS = ['rubberduck.no'];

export function isAllowedDomain(email: string): boolean {
  const domain = email.split('@')[1];
  return ALLOWED_DOMAINS.includes(domain);
}

export const AUTH_CONFIG = {
  providers: ['google'] as Provider[],
  appearance: {
    theme: 'light' as const,
    variables: {
      default: {
        colors: {
          brand: '#ffc814',
          brandAccent: '#ffbb00',
        },
      },
    },
  },
  localization: {
    variables: {
      sign_in: {
        social_provider_text: 'Logg inn med {{provider}}'
      }
    }
  },
  view: 'sign_in',
  showLinks: false,
  magicLink: false,
  socialLayout: 'vertical' as const,
  theme: 'default',
  onlyThirdPartyProviders: true
};