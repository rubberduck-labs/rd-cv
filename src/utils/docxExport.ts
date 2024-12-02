import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import type { ResumeData } from '../hooks/useResumeData';

function createHeading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 32,
        bold: true,
      }),
    ],
    spacing: { before: 400, after: 200 },
    alignment: AlignmentType.LEFT,
  });
}

function createSubheading(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 28,
        bold: true,
      }),
    ],
    spacing: { before: 300, after: 200 },
    alignment: AlignmentType.LEFT,
  });
}

function createParagraph(text: string): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        size: 24,
      }),
    ],
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.LEFT,
  });
}

function createTechTable(technologies: string[]): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: technologies.map(tech => 
          new TableCell({
            children: [new Paragraph({ 
              children: [
                new TextRun({
                  text: tech,
                  size: 24,
                }),
              ],
              alignment: AlignmentType.CENTER,
            })],
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
            },
            width: { size: Math.floor(100 / technologies.length), type: WidthType.PERCENTAGE },
          })
        ),
      }),
    ],
  });
}

export async function exportToDocx(resumeData: ResumeData) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Header
        createHeading(resumeData.personal.name),
        createParagraph(resumeData.personal.title),
        createParagraph(`${resumeData.personal.location} | ${resumeData.personal.phone} | ${resumeData.personal.email}`),
        
        // Summary
        createSubheading('Sammendrag'),
        ...resumeData.summary.map(text => createParagraph(text)),
        
        // Experience
        createSubheading('Erfaring'),
        ...resumeData.experience.flatMap(exp => [
          new Paragraph({
            children: [
              new TextRun({
                text: exp.title,
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: ` (${exp.period})`,
                size: 24,
                italics: true,
              }),
            ],
            spacing: { before: 200 },
          }),
          createParagraph(exp.description),
          createTechTable(exp.technologies),
          new Paragraph({ spacing: { after: 200 } }),
        ]),
        
        // Education
        createSubheading('Utdanning'),
        ...resumeData.education.map(edu => 
          new Paragraph({
            children: [
              new TextRun({
                text: edu.institution,
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: ` - ${edu.degree}`,
                size: 24,
              }),
              new TextRun({
                text: ` (${edu.period})`,
                size: 24,
                italics: true,
              }),
            ],
          })
        ),
        
        // Languages
        createSubheading('Språk'),
        ...resumeData.languages.map(lang =>
          new Paragraph({
            children: [
              new TextRun({
                text: lang.name,
                size: 24,
                bold: true,
              }),
              new TextRun({
                text: `: ${lang.level}`,
                size: 24,
              }),
            ],
          })
        ),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `cv-rubberduck-${resumeData.personal.name.toLowerCase().replace(/\s+/g, '-')}.docx`);
}