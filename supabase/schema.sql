-- Drop existing objects
DROP TRIGGER IF EXISTS update_resumes_updated_at ON resumes;
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS resumes;
DROP TABLE IF EXISTS users;
DROP EXTENSION IF EXISTS "uuid-ossp";

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create resumes table
CREATE TABLE resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON resumes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial data
INSERT INTO users (email) VALUES
  ('ns@rubberduck.no'),
  ('es@rubberduck.no');

-- Insert Nicolai's resume
INSERT INTO resumes (user_id, data)
SELECT 
  users.id,
  '{
    "personal": {
      "name": "Nicolai Stølen",
      "title": "Systemutvikler",
      "location": "Ås",
      "phone": "46 47 12 48",
      "birthYear": "1997",
      "email": "ns@rubberduck.no",
      "image": "https://static.wixstatic.com/media/5244da_bee9bb1c556b4d0e8427f413785af0ff~mv2.jpg",
      "companyLogo": "https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png"
    },
    "summary": [
      "Utvikler utdannet som Sivilingeniør i Fysikk og matematikk (Teknisk fysikk) ved NTNU. Har gjennom studiene erfaring med Python, C(++) og Fortran, og bruk av disse for matematiske beregninger og simuleringer av fysiske fenomener. Har i tillegg brukt OpenMP, MPI og CUDA i kombinasjon med C for å lage høyt skalerbare parallelliserte programmer.",
      "Har siden ung alder holdt på med datamaskiner generelt og programmering. Liker godt å jobbe med både frontend og backend, og liker å lage helhetlige løsninger.",
      "Er ivrig etter å utforske nye programmeringsspråk og teknologier, er en dyktig og allsidig utvikler med særdeles god teknisk forståelse.",
      "Tar de fleste utfordringer på strak arm og finner gode løsninger. Leverer alltid og samarbeider godt."
    ],
    "experience": [
      {
        "title": "SSB - Statistisk Sentralbyrå: Onyxia",
        "period": "09.2022 - dd",
        "description": "Onyxia er en plattform utviklet av INSEE, som Dapla Lab er bygget på. Den gir brukerne en enkel oversikt over tilgjengelige verktøy, både internt utviklet programvare og kjente open-source verktøy, som kan konfigureres etter brukerens behov. I prosjektet har jeg hatt en nøkkelrolle I utvikling og videreutvikling av funksjonalitet for brukerinteraksjoner og grensesnitt. Dette inkluderer integrasjon med backend-tjenester, håndtering av tilgangskontroll via OpenID Connect, og optimalisering av brukeropplevelse.",
        "technologies": ["React", "TypeScript", "OpenID Connect", "REST", "Agile", "GitHub", "GitHub Actions"]
      },
      {
        "title": "SSB - Statistisk Sentralbyrå: Dapla Ctrl",
        "period": "09.2022 - dd",
        "description": "Dapla Ctrl er en tjeneste for tilgangsstyring på Dapla, som gjør det enkelt å få oversikt over og administrere tilganger knyttet til Dapla-team. Alle ansatte i SSB kan logge inn på tjenesten via https://ctrl.dapla.ssb.no/. Jeg jobbet i utvikling av brukergrensesnittet, inkludert design og implementasjon av interaktive komponenter, samt etablering av moderne frontend-arkitektur som sikrer skalerbarhet og vedlikeholdbarhet.",
        "technologies": ["React", "JavaScript", "Agile", "REST", "GitHub", "GitHub Actions"]
      },
      {
        "title": "SSB - Statistisk Sentralbyrå: Dapla",
        "period": "09.2022 - dd",
        "description": "\"Dapla\" - SSBs dataplattform i skyen, hvor data fra mange ulike kilder hentes inn, pseudonymiseres og konverteres til felles format. Data berikes og knyttes til en metadatamodell slik at de kan kombineres og benyttes for statistikkproduksjon på tvers av avdelinger og fagområder i SSB. Sentralt i løsningen har vært datainnsamling og -konvertering. Her har jeg hatt en nøkkelrolle for utvikling av tjenestene rundt datakonvertering og SSBs pseudonymiseringsfunksjonalitet.",
        "technologies": ["Google Cloud", "Python", "Java", "React", "Kubernetes", "Terraform", "Spring Boot", "PostgreSQL"]
      }
    ],
    "education": {
      "institution": "Norges teknisk-naturvitenskapelige universitet (NTNU)",
      "degree": "Sivilingeniør i Teknisk fysikk",
      "period": "2016 - 2022"
    },
    "languages": [
      {
        "name": "Norsk",
        "level": "Morsmål"
      },
      {
        "name": "Engelsk",
        "level": "Flytende"
      },
      {
        "name": "Spansk",
        "level": "Avansert"
      }
    ]
  }'::jsonb
FROM users WHERE email = 'ns@rubberduck.no';

-- Insert Espen's resume
INSERT INTO resumes (user_id, data)
SELECT 
  users.id,
  '{
    "personal": {
      "name": "Espen Schulstad",
      "title": "Seniorkonsulent",
      "location": "Frogner",
      "phone": "97561041",
      "birthYear": "1982",
      "email": "es@rubberduck.no",
      "image": "https://static.wixstatic.com/media/d42034_18dc54d8dc8642b88d91f5747e02d288~mv2.jpeg/v1/fill/w_517,h_768,al_c,q_85,enc_avif,quality_auto/d42034_18dc54d8dc8642b88d91f5747e02d288~mv2.jpeg",
      "companyLogo": "https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png/v1/fill/w_198,h_150,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rubberduck.png"
    },
    "summary": [
      "Espen er en allsidig og erfaren fullstack utvikler med en variert bakgrunn fra prosjekter der han har jobbet mye med utforming av teknisk arkitektur, integrasjonsarbeid og utvikling av webapplikasjoner og apper.",
      "Som konsulent er han opptatt av å holde ting enkelt. Han verdsetter vedlikeholdbarhet og kundeopplevelse over ny teknologi. Han liker å forstå helheten i kundens systemer.",
      "Espen er enkel å samarbeide med og er en sterk lagspiller."
    ],
    "experience": [
      {
        "title": "Posten Norge: Checkout",
        "period": "09.2022 - dd",
        "description": "Ansvarlig for vedlikehold og utvikling av Postens API for checkout, som da gjelder å tilgjengeliggjøre tjenester for nettbutikker og TA-leverandører som ønsker å eksponere hentesteder, produkter, priser, leveringstider og adressevalidering i en checkout. I tillegg til å vedlikeholde og utvikle disse API-ene har arbeidet gått ut på å lage best practice guider og interaktive integrasjonsguider. En viktig del av oppdraget var å jobbe med nyutviklingen av apper og widgets for Posten blant annet på Shopify, Woocommerce, Klarna Shipping assistant for å tilby transportalternativer i checkout for Posten. Arbeidet med plugins for Shopify og Woocommerce ble kåret til vinner av innovasjonsprisen til Posten i 2024. Samtidig med rollen i Checkout-teamet har Espen vært hovedansvarlig for miljøapiene i Posten, der han har eksponert miljødata for rapporter i sporing av pakker og i checkout-løsningene. Espen har også vært Security Champion, der han har deltatt i å promotere sikkerhet i Posten.",
        "technologies": ["Kotlin", "React", "OpenSearch", "Node.js", "Azure", "Terraform"]
      },
      {
        "title": "Posten Norge: Plattform",
        "period": "04.2022 - 08.2022",
        "description": "På grunn av et prekært behov for ferdigstille migrering av applikasjoner og databaser til azure, for å unngå å vedlikeholde to plattformer (on premise og azure), fikk Espen tildelt en spesialrolle der hans oppgave var å migrere gjenstående databaser og applikasjoner på tvers av alle utviklingsteam til skyen.",
        "technologies": ["Azure DevOps", "PostgreSQL", "Terraform"]
      },
      {
        "title": "Posten Norge: Shelfless",
        "period": "11.2021 - 03.2022",
        "description": "Nyutvikling av kundeportal for Postens varehus-løsning \"Shelfless\". Oppdraget gikk ut på etablering av nye apier til bruk av internt integrasjonsplattform samt understøtte kundeportalen som håndterer salgsordre utført i bl.a nettbutikker og innkjøpsordre som håndteres av varehuset. Løsningen ble skrevet i kotlin, deployet i azure.",
        "technologies": ["Kotlin", "Spring", "Azure", "PostgreSQL", "Playwright", "React"]
      }
    ],
    "education": {
      "institution": "Høgskolen i Oslo",
      "degree": "Bachelor in Computer Science",
      "period": "2002 - 2005"
    },
    "languages": [
      {
        "name": "Norsk",
        "level": "Morsmål"
      },
      {
        "name": "Engelsk",
        "level": "Flytende"
      },
      {
        "name": "Tysk",
        "level": "delvis"
      }
    ]
  }'::jsonb
FROM users WHERE email = 'es@rubberduck.no';