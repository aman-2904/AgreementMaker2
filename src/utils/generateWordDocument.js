import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, HeadingLevel, ImageRun, Footer } from "docx";
import { saveAs } from "file-saver";

export const generateWordDocument = async (data) => {
    // Helper functions
    const boldText = (text) => new TextRun({ text: text, bold: true });
    const normalText = (text) => new TextRun({ text: text || "" });

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('-');
        if (parts.length === 3 && parts[0].length === 4) {
            const [year, month, day] = parts;
            return `${day}-${month}-${year}`;
        }
        return dateString;
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        if (!hours || !minutes) return timeString;
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    const createBullet = (text) => new Paragraph({
        children: [normalText(text)],
        bullet: { level: 0 },
        spacing: { after: 100 }
    });

    const parseFormattedText = (text) => {
        if (!text) return [];
        const parts = text.split(/(\*\*.*?\*\*)/g).filter(part => part);
        return parts.map(part => {
            if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                return boldText(part.slice(2, -2));
            }
            return normalText(part);
        });
    };

    // Table border styles
    const tableBorder = {
        top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
    };

    // Fetch logo
    let imageBuffer = null;
    try {
        const response = await fetch('/splogo1.png');
        if (response.ok) {
            const blob = await response.blob();
            imageBuffer = await blob.arrayBuffer();
        }
    } catch (e) {
        console.warn("Could not load logo", e);
    }

    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
                }
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            children: [
                                boldText(data.clientName || 'CLIENT NAME'),
                                new TextRun({ text: "                                                                                                    " }),
                                boldText("MS. SHIVANI")
                            ],
                            spacing: { before: 200 }
                        })
                    ]
                })
            },
            children: [
                // Logo
                ...(imageBuffer ? [new Paragraph({
                    children: [new ImageRun({ data: imageBuffer, transformation: { width: 80, height: 80 } })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 200 }
                })] : []),

                // Header
                new Paragraph({
                    children: [boldText("HOTEL & WEDDING VENUE AGREEMENT")],
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 100 }
                }),
                new Paragraph({
                    children: [new TextRun({ text: "(Provided by the Shaadi Platform by Nosh N Shots)", bold: true, underline: {} })],
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 300 }
                }),

                // Agreement date
                new Paragraph({
                    children: [normalText("This Agreement is made on "), boldText(formatDate(data.agreementDate) || '[Date]'), normalText(", by and between:")],
                    spacing: { after: 200 }
                }),

                // Management Agency
                new Paragraph({ children: [boldText("Management Agency:")], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
                new Paragraph({ children: [boldText("Name: "), normalText("Shaadi Platform by Nosh N Shots")] }),
                new Paragraph({ children: [boldText("Address: "), normalText("Shivani.sharma@noshnshots.com")] }),
                new Paragraph({ children: [boldText("Contact: "), normalText("+91 99908-37771")], spacing: { after: 200 } }),

                // Client Details
                new Paragraph({ children: [boldText("Client Details:")], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
                new Paragraph({ children: [boldText("Name: "), normalText(data.clientDetailsName || 'Shaadi Platform by Nosh N Shots')] }),
                new Paragraph({ children: [boldText("Address: "), normalText(data.clientDetailsAddress || 'Shivani.sharma@noshnshots.com')] }),
                new Paragraph({ children: [boldText("Contact: "), normalText(data.clientDetailsPhone || '+91 99908-7771')], spacing: { after: 300 } }),

                // Hotel
                new Paragraph({ children: [boldText("Hotel / Wedding Venue:")], alignment: AlignmentType.CENTER, spacing: { after: 100 } }),
                new Paragraph({ children: [boldText("Name: "), normalText(data.hotelName || 'NAME')] }),
                new Paragraph({ children: [boldText("Address: "), normalText(data.hotelAddress || 'ADDRESS')] }),
                new Paragraph({ children: [boldText("Contact Person: "), normalText(data.hotelContactNumber || '1234677890')], spacing: { after: 300 } }),

                // Subject
                new Paragraph({
                    children: [boldText(`SUB: - Letter of Agreement between ${data.clientName || 'Client Name'} & Shaadi Platform by Nosh N Shots`)],
                    spacing: { after: 200 }
                }),

                new Paragraph({
                    children: [normalText("This Agreement defines the terms and conditions under which the Hotel shall provide venue facilities, and the Management Agency shall plan, coordinate, manage, and execute the wedding and related events (\"Event\") on behalf of "), boldText(data.clientName || 'Client'), normalText(".")],
                    spacing: { after: 300 }
                }),

                // EVENT DETAILS
                new Paragraph({ children: [boldText("EVENT DETAILS")], spacing: { after: 100 } }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Event Name")], alignment: AlignmentType.CENTER })], shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(data.eventName || 'Wedding Celebration')] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Client Name")], alignment: AlignmentType.CENTER })], shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(data.brideGroomName || '[Bride & Groom Name]')] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Event Dates")], alignment: AlignmentType.CENTER })], shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(data.eventDates || '[Event Dates]')] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Number of Guests")], alignment: AlignmentType.CENTER })], shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(data.numberOfGuests || '[Approx. Pax]')] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Venue Areas")], alignment: AlignmentType.CENTER })], shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(data.venueAreas || '[Ballroom / Lawn / Poolside / Other]')] })], borders: tableBorder }),
                            ]
                        }),
                    ]
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // SCOPE OF SERVICES
                new Paragraph({ children: [boldText("SCOPE OF SERVICES (VENUE OBLIGATIONS)")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Venue agrees to provide the following:")], spacing: { after: 100 } }),
                ...['Exclusive access to agreed event areas', 'Power, water, lighting, and basic infrastructure', 'Furniture as per agreed layout', 'Washroom facilities', 'Back-of-house/vendor access', 'Security and housekeeping support'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // ROLE OF MANAGEMENT AGENCY
                new Paragraph({ children: [boldText("ROLE OF MANAGEMENT AGENCY")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Management Agency shall:")], spacing: { after: 100 } }),
                ...['Act as the sole point of coordination between the client and venue', 'Manage event planning, timelines, and execution', 'Coordinate with vendors (decor, sound, catering, etc.)'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // Accommodation Details
                new Paragraph({ children: [boldText("Accommodation Details: -")], spacing: { after: 100 } }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Arrival")], alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Time")], alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Total Rooms")], alignment: AlignmentType.CENTER })], width: { size: 40, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Rates")], alignment: AlignmentType.CENTER })], width: { size: 20, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                            ]
                        }),
                        ...(data.accommodationDetails || []).map(detail => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText(detail.arrival || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(detail.time || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(detail.totalRooms || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(detail.rates || '-')] })], borders: tableBorder }),
                            ]
                        }))
                    ]
                }),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // Inclusions
                new Paragraph({ children: [boldText("Inclusions:")], spacing: { after: 100 } }),
                ...(data.inclusions || []).map(item => new Paragraph({ children: [normalText("> " + item)], spacing: { after: 100 } })),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // Notes
                new Paragraph({ children: [new TextRun({ text: "NOTE:", bold: true, underline: {} })], spacing: { after: 100 } }),
                ...(data.notes || []).map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // Menu Grid
                new Paragraph({ children: [new TextRun({ text: "MENU GRID:", bold: true, underline: {} })], spacing: { after: 100 } }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Lunch (Veg)")], alignment: AlignmentType.CENTER })], width: { size: 33, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Dinner (Veg)")], alignment: AlignmentType.CENTER })], width: { size: 33, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Hi-Tea")], alignment: AlignmentType.CENTER })], width: { size: 33, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                            ]
                        }),
                        ...(data.menuGrid || []).map(row => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [normalText(row.lunch || '')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(row.dinner || '')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(row.hiTea || '')] })], borders: tableBorder }),
                            ]
                        }))
                    ]
                }),
                new Paragraph({ text: "", spacing: { after: 100 } }),
                new Paragraph({ children: [boldText("ENSURE COMPLIANCE WITH VENUE POLICIES")], spacing: { after: 300 } }),

                // PAYMENT TERMS
                new Paragraph({ children: [boldText("PAYMENT TERMS")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("As agreed, the deposit schedule for your block will be as per this schedule: "), boldText(data.currency || 'INR')], spacing: { after: 100 } }),
                ...(data.additionalPaymentText || []).map(text => new Paragraph({ children: parseFormattedText(text), spacing: { after: 100 } })),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Date")], alignment: AlignmentType.CENTER })], width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("PARTICULARS")], alignment: AlignmentType.CENTER })], width: { size: 50, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("AMOUNT")], alignment: AlignmentType.CENTER })], width: { size: 25, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                            ]
                        }),
                        ...(data.paymentTerms || []).map(term => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText(term.date || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(term.particulars || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(term.amount || '-')] })], borders: tableBorder }),
                            ]
                        }))
                    ]
                }),
                new Paragraph({ children: [normalText("To confirm booking for the Event, request you to send us a signed copy of this Agreement, a copy of the PAN card /or GST Registration Copy (as applicable) along with scheduled advances on "), boldText(formatDate(data.scheduledAdvanceDate) || 'Date'), normalText(".")], spacing: { before: 200, after: 200 } }),
                ...(data.paymentNote ? [new Paragraph({ children: parseFormattedText(data.paymentNote), spacing: { after: 300 } })] : []),

                // CANCELLATION & REFUND POLICY
                new Paragraph({ children: [boldText("CANCELLATION & REFUND POLICY")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("If the Event is partially or entirely cancelled, the Hotel must be notified in writing. The Initial Deposit is non-refundable and shall be forfeited in the event of any cancellation. Additionally, Cancellation Fee is calculated as per table below.")], spacing: { after: 200 } }),
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Notification of cancellation (no. of days prior to event / Group)")], alignment: AlignmentType.CENTER })], width: { size: 40, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Cancellation fee")], alignment: AlignmentType.CENTER })], width: { size: 60, type: WidthType.PERCENTAGE }, shading: { fill: "E0F2F1" }, borders: tableBorder }),
                            ]
                        }),
                        ...(data.cancellationPolicy || []).map(term => new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText(term.period || '-')] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [normalText(term.fee || '-')] })], borders: tableBorder }),
                            ]
                        }))
                    ]
                }),
                new Paragraph({ text: "", spacing: { after: 300 } }),

                // POSTPONEMENT
                new Paragraph({ children: [boldText("POSTPONEMENT")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("Postponement shall be subject to:")], spacing: { after: 100 } }),
                ...['Availability of the Management Agency', 'Revised commercial terms', 'Additional coordination fees'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // NON-REFUNDABILITY
                new Paragraph({ children: [boldText("NON-REFUNDABILITY")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("All professional fees paid to the Management Agency are "), boldText("non-refundable under any circumstances"), normalText(". Vendor advances are subject to vendor cancellation policies, and the Management Agency shall not be liable for refunds.")], spacing: { after: 300 } }),

                // INDEMNIFICATION
                new Paragraph({ children: [boldText("INDEMNIFICATION AND HOLD HARMLESS")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("Group and Hotel agree to defend, indemnify and hold each other harmless from and against all claims, costs, losses, expenses, damages, actions, causes of action, and/or liabilities, including reasonable attorneys' fees arising out of or resulting from: (i) any negligent act undertaken or committed by the indemnifying entity or any contractors hired or engaged by the indemnifying entity in connection with the performance of the entity's respective obligations under this Agreement; or (ii) any breach by the indemnifying entity of its obligations under the Sections of this Agreement titled \"Compliance with Laws\" or \"Privacy of Personal Information.\" The liability of both parties under any circumstances shall not exceed the total contracted value paid under the agreement.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // DAMAGE TO HOTEL PREMISES
                new Paragraph({ children: [boldText("DAMAGE TO HOTEL PREMISES")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The client is liable for any damage caused to "), boldText(data.hotelName || 'Ananta Ajabgarh, Jaipur Rajasthan'), normalText(" (the \"Hotel\"), property or equipment by the client or contractor of the client or the client's guests attending the event and the client shall reimburse the hotel for any such damage that may be caused.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // LIMITATION OF LIABILITY
                new Paragraph({ children: [boldText("LIMITATION OF LIABILITY")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("Except for damages covered by the indemnifying entity's indemnification obligations as set forth in the Section titled \"Indemnification and Hold Harmless,\" neither entity shall be liable to the other for any special, indirect, incidental, consequential, punitive or exemplary damages even if such entity has knowledge of the possibility of such damages, provided that in no event shall either entity be liable to the other for any lost profits.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // GOVERNING LAWS
                new Paragraph({ children: [boldText("GOVERNING LAWS, JURISDICTION AND DISPUTE RESOLUTION")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("This Agreement, the construction and enforcement of its terms and the interpretation of the rights and duties of the parties hereto shall be subject to and governed by the laws of India. The parties hereby submit to the exclusive jurisdiction of the courts of "), boldText(data.jurisdiction || 'Jaipur Rajasthan'), normalText(" only. If any dispute or difference shall at any time arise between the Parties relating to or arising out of the terms of this Agreement (whether during the continuance of this Agreement or upon or after its termination), and no amicable resolution or settlement is reached within a period of Thirty (30) days, Such disputes and/or differences shall be subject to the exclusive jurisdiction of the courts of "), boldText(data.jurisdiction || 'Jaipur Rajasthan'), normalText(" only.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // DECOR
                new Paragraph({ children: [boldText("DECOR, PRODUCTION & TECHNICAL GUIDELINES")], spacing: { after: 100 } }),
                ...['Decor must comply with venue guidelines', 'No drilling, nailing, or permanent fixing', 'Setup and dismantling timings are mandatory', 'Poolside and restricted areas require written permission'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // AUDIO
                new Paragraph({ children: [boldText("AUDIO, LIGHT & DRONE POLICY")], spacing: { after: 100 } }),
                createBullet('Sound restrictions as per local authority norms'),
                new Paragraph({ children: [boldText(`DJ/music cutoff time: ${formatTime(data.djCutoffTime) || '[Time]'}`)], bullet: { level: 0 }, spacing: { after: 100 } }),
                createBullet('Drone usage allowed only with written approval and legal permits'),
                createBullet('Poolside and restricted areas excluded unless permitted'),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // LIABILITY
                new Paragraph({ children: [boldText("LIABILITY & DAMAGES")], spacing: { after: 100 } }),
                ...['Any damage caused by guests or vendors will be chargeable', 'Venue and Agency are not responsible for loss of personal belongings', 'Client indemnifies venue and agency against misconduct or violations'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // SAFETY
                new Paragraph({ children: [boldText("SAFETY & COMPLIANCE")], spacing: { after: 100 } }),
                ...['Fire safety, crowd control, and emergency protocols to be followed', 'Event to comply with local laws and government regulations', 'No illegal or prohibited activities allowed'].map(createBullet),
                new Paragraph({ text: "", spacing: { after: 200 } }),

                // INDEMNITY
                new Paragraph({ children: [boldText("INDEMNITY")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Client and Hotel agree to indemnify and hold harmless the Management Agency from:")], spacing: { after: 100 } }),
                ...['Legal claims', 'Penalties', 'Vendor disputes', 'Licensing violations', 'Guest misconduct'].map(createBullet),
                new Paragraph({ children: [normalText("This clause survives termination.")], spacing: { after: 300 } }),

                // FORCE MAJEURE
                new Paragraph({ children: [boldText("FORCE MAJEURE")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Management Agency shall not be liable for delays or failures due to events beyond control including natural disasters, government orders, pandemics, or curfews. All payments remain non-refundable.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // TERMINATION
                new Paragraph({ children: [boldText("TERMINATION")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Management Agency may terminate the Agreement with immediate effect in case of:")], spacing: { after: 100 } }),
                ...['Payment defaults', 'Client interference', 'Breach of terms', 'Reputational risk'].map(createBullet),
                new Paragraph({ children: [normalText("All dues become immediately payable.")], spacing: { after: 300 } }),

                // CLIENT RESPONSIBILITIES
                new Paragraph({ children: [boldText("CLIENT RESPONSIBILITIES")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("The Client shall:")], spacing: { after: 100 } }),
                ...['Ensure guest discipline', 'Be liable for guest', 'Ensure compliance with laws', 'Provide accurate information and approvals'].map(createBullet),
                new Paragraph({ children: [normalText("Failure releases the Management Agency from liability.")], spacing: { after: 300 } }),

                // IP
                new Paragraph({ children: [boldText("INTELLECTUAL PROPERTY & PROMOTION")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("All event concepts, designs, and plans remain the intellectual property of the Management Agency. The Agency may use event content for marketing unless restricted in writing.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // LICENSES
                new Paragraph({ children: [boldText("LICENSES & PERMISSIONS POLICY (HOTEL GUIDELINES)")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("All statutory licences including but not limited to:")], spacing: { after: 100 } }),
                ...['Liquor license', 'PPL', 'IPRS', 'NOVEX', 'Sound license and any kind off other license.'].map(createBullet),
                new Paragraph({ children: [normalText("Shall be arranged and paid for by the Client. The Management Agency and Hotel shall not be liable for denial or delay of approvals.")], spacing: { after: 300 } }),

                // ENTIRE AGREEMENT
                new Paragraph({ children: [boldText("ENTIRE AGREEMENT")], spacing: { after: 100 } }),
                new Paragraph({ children: [normalText("This document constitutes the entire agreement and supersedes all prior discussions. Any amendment must be in writing and signed by the Management Agency.")], alignment: AlignmentType.JUSTIFIED, spacing: { after: 300 } }),

                // AGREED AND ACCEPTED
                new Paragraph({ children: [boldText("AGREED AND ACCEPTED BY "), normalText(data.clientName || 'Client Name'), boldText(". AND SHAADI PLATFORM BY NOSH N SHOTS.")], spacing: { before: 300, after: 300 } }),

                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ text: "", spacing: { after: 800 } })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ text: "", spacing: { after: 800 } })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("Signature                    Date")] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText("Signature                    Date")] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("SHIVANI S BHARDWAJ")] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(`CLIENT NAME: ${data.clientName || 'CLIENT NAME'}`)] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("DIRECTOR")] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(`EMAIL: ${data.signatureEmail || ''}`)] })], borders: tableBorder }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({ children: [new Paragraph({ children: [boldText("SHAADI PLATFORM BY NOSH N SHOTS")] })], borders: tableBorder }),
                                new TableCell({ children: [new Paragraph({ children: [boldText(`CONTACT NO: ${data.signatureContact || ''}`)] })], borders: tableBorder }),
                            ]
                        }),
                    ]
                })
            ]
        }]
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `Agreement_${data.clientName || 'Client'}.docx`);
    });
};
