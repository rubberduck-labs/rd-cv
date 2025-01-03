import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPdf(element: HTMLElement, filename: string) {
  // Clone the element to avoid modifying the original DOM
  const clonedElement = element.cloneNode(true) as HTMLElement;
  clonedElement.classList.add('generating-pdf');
  
  // Create a temporary container
  const container = document.createElement('div');
  container.style.visibility = 'hidden';
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.appendChild(clonedElement);
  document.body.appendChild(container);

  try {
    // Initialize PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Get all page break elements
    const pageBreaks = Array.from(clonedElement.querySelectorAll('.page-break-start'));
    const pages = [clonedElement];
    
    // Split content at page breaks
    pageBreaks.forEach((breakEl) => {
      const nextElements = [];
      let currentEl = breakEl.nextElementSibling;
      
      while (currentEl && !currentEl.classList.contains('page-break-start')) {
        nextElements.push(currentEl);
        currentEl = currentEl.nextElementSibling;
      }
      
      if (nextElements.length > 0) {
        const pageContainer = document.createElement('div');
        pageContainer.classList.add('content-wrapper');
        nextElements.forEach(el => pageContainer.appendChild(el.cloneNode(true)));
        pages.push(pageContainer);
      }
    });

    // Render each page
    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        windowWidth: 1200,
        height: pages[i].scrollHeight
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      
      // Calculate scaling to fit page
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add new page if not first page
      if (i > 0) {
        pdf.addPage();
      }
      
      // Add image to PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    }

    // Save PDF
    pdf.save(filename);
  } finally {
    // Clean up
    document.body.removeChild(container);
  }
}