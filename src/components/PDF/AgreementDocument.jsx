import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingBottom: 60, // Space for footer
        paddingHorizontal: 40,
        fontSize: 10,
        fontFamily: 'Helvetica',
        lineHeight: 1.4,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold', // Helvetica-Bold
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 10,
        textDecoration: 'underline',
        marginBottom: 15,
        fontFamily: 'Helvetica-Bold', // Seems bold in image
        textAlign: 'center',
    },
    section: {
        marginBottom: 10,
    },
    bold: {
        fontFamily: 'Helvetica-Bold',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 2,
    },
    label: {
        width: 120,
        fontFamily: 'Helvetica-Bold',
    },
    value: {
        flex: 1,
    },
    // Table Styles
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 15,
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColHeader: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#E0F2F1', // Light cyan/blue background for headers
        padding: 5,
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
    },
    tableCellHeader: {
        margin: "auto",
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
    },
    tableCell: {
        margin: 5,
        fontSize: 10,
        textAlign: 'left'
    },
    // Footer
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 9,
        color: '#4472C4', // Blue color as seen in bottom right
    },
    footerTextLeft: {
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: 'black', // Dynamic client name is black/yellow highlighted in editor but black in PDF
        backgroundColor: 'transparent',
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 3,
        paddingLeft: 10,
    },
    bullet: {
        width: 15,
        fontSize: 15, // larger bullet
        lineHeight: 0.7,
    }
});

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

const AgreementDocument = ({ data }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                {/* Header */}
                <View style={styles.header}>
                    <Image
                        src="/splogo1.png"
                        style={{ width: 80, height: 80, marginBottom: 10, alignSelf: 'center' }}
                    />
                    <Text style={styles.title}>HOTEL & WEDDING VENUE AGREEMENT</Text>
                    <Text style={styles.subtitle}>(Provided by the Shaadi Platform by Nosh N Shots)</Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        This Agreement is made on <Text style={styles.bold}>{formatDate(data.agreementDate) || '[Date]'}</Text>, by and between:
                    </Text>
                </View>

                {/* Management Agency */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { textAlign: 'center', marginBottom: 5 }]}>Management Agency:</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>Shaadi Platform by Nosh N Shots</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={[styles.value, { color: 'black', backgroundColor: 'transparent' }]}>Shivani.sharma@noshnshots.com</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact:</Text>
                        <Text style={[styles.value, { color: 'black', backgroundColor: 'transparent' }]}>+91 99908-37771</Text>
                    </View>
                </View>

                {/* Client Details */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { textAlign: 'center', marginBottom: 5 }]}>Client Details:</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{data.clientDetailsName || 'Shaadi Platform by Nosh N Shots'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={[styles.value, { color: 'black', backgroundColor: 'transparent' }]}>{data.clientDetailsAddress || 'Shivani.sharma@noshnshots.com'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact:</Text>
                        <Text style={[styles.value, { color: 'black', backgroundColor: 'transparent' }]}>{data.clientDetailsPhone || '+91 99908-7771'}</Text>
                    </View>
                </View>


                <Text style={{ textAlign: 'left', marginBottom: 10 }}></Text>

                {/* Hotel / Wedding Venue */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { textAlign: 'center', marginBottom: 5 }]}>Hotel / Wedding Venue:</Text>
                    <View style={styles.row}>
                        <Text style={styles.label}>Name:</Text>
                        <Text style={styles.value}>{data.hotelName || 'NAME'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{data.hotelAddress || 'ADDRESS'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Contact Person:</Text>
                        <Text style={styles.value}>{data.hotelContactNumber || '1234677890'}</Text>
                    </View>
                </View>

                {/* Subject */}
                <View style={[styles.section, { marginTop: 10 }]}>
                    <Text style={styles.bold}>
                        SUB: - Letter of Agreement between {data.clientName || 'Client Name'} & Shaadi Platform by Nosh N Shots
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text>
                        This Agreement defines the terms and conditions under which the Hotel shall provide venue facilities, and the Management Agency shall plan, coordinate, manage, and execute the wedding and related events ("Event") on behalf of <Text style={styles.bold}>Client</Text>.
                    </Text>
                </View>

                {/* EVENT DETAILS TABLE */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>EVENT DETAILS</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Event Name</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>{data.eventName || 'Wedding Celebration'}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Client Name</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>{data.brideGroomName || '[Bride & Groom Name]'}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Event Dates</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>{data.eventDates || '[Event Dates]'}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Number of Guests</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>{data.numberOfGuests || '[Approx. Pax]'}</Text></View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Venue Areas</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>{data.venueAreas || '[Ballroom / Lawn / Poolside / Other]'}</Text></View>
                        </View>
                    </View>
                </View>

                {/* SCOPE OF SERVICES */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>SCOPE OF SERVICES (VENUE OBLIGATIONS)</Text>
                    <Text style={{ marginBottom: 5 }}>The Venue agrees to provide the following:</Text>
                    {['Exclusive access to agreed event areas',
                        'Power, water, lighting, and basic infrastructure',
                        'Furniture as per agreed layout',
                        'Washroom facilities',
                        'Back-of-house/vendor access',
                        'Security and housekeeping support'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* ROLE OF MANAGEMENT AGENCY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>ROLE OF MANAGEMENT AGENCY</Text>
                    <Text style={{ marginBottom: 5 }}>The Management Agency shall:</Text>
                    {['Act as the sole point of coordination between the client and venue',
                        'Manage event planning, timelines, and execution',
                        'Coordinate with vendors (decor, sound, catering, etc.)'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* Accommodation Details */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>Accommodation Details: -</Text>
                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableColHeader, { width: '20%' }]}><Text style={styles.tableCellHeader}>Arrival</Text></View>
                            <View style={[styles.tableColHeader, { width: '20%' }]}><Text style={styles.tableCellHeader}>Time</Text></View>
                            <View style={[styles.tableColHeader, { width: '40%' }]}><Text style={styles.tableCellHeader}>Total Rooms</Text></View>
                            <View style={[styles.tableColHeader, { width: '20%' }]}><Text style={styles.tableCellHeader}>Rates</Text></View>
                        </View>
                        {/* Dynamic Rows */}
                        {data.accommodationDetails && data.accommodationDetails.map((detail, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCol, { width: '20%' }]}><Text style={[styles.tableCell, styles.bold]}>{detail.arrival || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '20%' }]}><Text style={styles.tableCell}>{detail.time || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '40%' }]}><Text style={styles.tableCell}>{detail.totalRooms || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '20%' }]}><Text style={styles.tableCell}>{detail.rates || '-'}</Text></View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Inclusions */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>Inclusions:</Text>
                    {data.inclusions && data.inclusions.map((item, i) => (
                        <View key={i} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>{'>'}</Text>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Notes */}
                <View style={styles.section} wrap={false}>
                    <Text style={[styles.bold, { marginBottom: 5, textDecoration: 'underline' }]}>NOTE:</Text>
                    {data.notes && data.notes.map((item, i) => (
                        <View key={i} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text>{item}</Text>
                        </View>
                    ))}
                </View>

                {/* Menu Grid */}
                <View style={[styles.section, { marginTop: -5 }]}>
                    <Text style={[styles.bold, { marginBottom: 3, textDecoration: 'underline' }]}>MENU GRID:</Text>
                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.tableRow} fixed>
                            <View style={[styles.tableColHeader, { width: '33.33%' }]}><Text style={styles.tableCellHeader}>Lunch (Veg)</Text></View>
                            <View style={[styles.tableColHeader, { width: '33.33%' }]}><Text style={styles.tableCellHeader}>Dinner (Veg)</Text></View>
                            <View style={[styles.tableColHeader, { width: '33.33%' }]}><Text style={styles.tableCellHeader}>Hi-Tea</Text></View>
                        </View>
                        {/* Dynamic Rows */}
                        {data.menuGrid && data.menuGrid.map((row, index) => (
                            <View style={styles.tableRow} key={index} wrap={false}>
                                <View style={[styles.tableCol, { width: '33.33%' }]}><Text style={styles.tableCell}>{row.lunch || ''}</Text></View>
                                <View style={[styles.tableCol, { width: '33.33%' }]}><Text style={styles.tableCell}>{row.dinner || ''}</Text></View>
                                <View style={[styles.tableCol, { width: '33.33%' }]}><Text style={styles.tableCell}>{row.hiTea || ''}</Text></View>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.bold}>ENSURE COMPLIANCE WITH VENUE POLICIES</Text>
                </View>

                {/* PAYMENT TERMS */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>PAYMENT TERMS</Text>
                    <Text style={{ marginBottom: 5 }}>As agreed, the deposit schedule for your block will be as per this schedule: <Text style={styles.bold}>{data.currency || 'INR'}</Text></Text>

                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableColHeader, { width: '25%' }]}><Text style={styles.tableCellHeader}>Date</Text></View>
                            <View style={[styles.tableColHeader, { width: '50%' }]}><Text style={styles.tableCellHeader}>PARTICULARS</Text></View>
                            <View style={[styles.tableColHeader, { width: '25%' }]}><Text style={styles.tableCellHeader}>AMOUNT</Text></View>
                        </View>
                        {/* Dynamic Rows */}
                        {data.paymentTerms && data.paymentTerms.map((term, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCol, { width: '25%' }]}><Text style={[styles.tableCell, styles.bold]}>{term.date || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.tableCell}>{term.particulars || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '25%' }]}><Text style={styles.tableCell}>{term.amount || '-'}</Text></View>
                            </View>
                        ))}
                    </View>

                    <Text>
                        To confirm booking for the Event, request you to send us a signed copy of this Agreement, a copy of the PAN card /or GST Registration Copy (as applicable) along with scheduled advances on <Text style={styles.bold}>{formatDate(data.scheduledAdvanceDate) || 'Date'}</Text>.
                    </Text>
                </View>

                {/* CANCELLATION & REFUND POLICY */}
                <View style={styles.section} wrap={false}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>CANCELLATION & REFUND POLICY</Text>
                    <Text style={{ marginBottom: 10 }}>If the Event is partially or entirely cancelled, the Hotel must be notified in writing. The Initial Deposit is non-refundable and shall be forfeited in the event of any cancellation. Additionally, Cancellation Fee is calculated as per table below.</Text>

                    <View style={styles.table}>
                        {/* Header */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableColHeader, { width: '40%' }]}><Text style={styles.tableCellHeader}>Notification of cancellation (no. of days prior to event / Group)</Text></View>
                            <View style={[styles.tableColHeader, { width: '60%' }]}><Text style={styles.tableCellHeader}>Cancellation fee</Text></View>
                        </View>
                        {/* Dynamic Rows */}
                        {data.cancellationPolicy && data.cancellationPolicy.map((term, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={[styles.tableCol, { width: '40%' }]}><Text style={[styles.tableCell, styles.bold]}>{term.period || '-'}</Text></View>
                                <View style={[styles.tableCol, { width: '60%' }]}><Text style={styles.tableCell}>{term.fee || '-'}</Text></View>
                            </View>
                        ))}
                    </View>
                </View>

                {/* POSTPONEMENT */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>POSTPONEMENT</Text>
                    <Text style={{ marginBottom: 5 }}>Postponement shall be subject to:</Text>
                    {['Availability of the Management Agency',
                        'Revised commercial terms',
                        'Additional coordination fees'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* NON-REFUNDABILITY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>NON-REFUNDABILITY</Text>
                    <Text>
                        All professional fees paid to the Management Agency are <Text style={styles.bold}>non-refundable under any circumstances</Text>. Vendor advances are subject to vendor cancellation policies, and the Management Agency shall not be liable for refunds.
                    </Text>
                </View>

                {/* INDEMNIFICATION AND HOLD HARMLESS */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>INDEMNIFICATION AND HOLD HARMLESS</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        Group and Hotel agree to defend, indemnify and hold each other harmless from and against all claims, costs, losses, expenses, damages, actions, causes of action, and/or liabilities, including reasonable attorneys’ fees arising out of or resulting from: (i) any negligent act undertaken or committed by the indemnifying entity or any contractors hired or engaged by the indemnifying entity in connection with the performance of the entity’s respective obligations under this Agreement; or (ii) any breach by the indemnifying entity of its obligations under the Sections of this Agreement titled “Compliance with Laws” or “Privacy of Personal Information.” The liability of both parties under any circumstances shall not exceed the total contracted value paid under the agreement.
                    </Text>
                </View>

                {/* DAMAGE TO HOTEL PREMISES */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>DAMAGE TO HOTEL PREMISES</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        The client is liable for any damage caused to <Text style={styles.bold}>{data.hotelName || 'Ananta Ajabgarh, Jaipur Rajasthan'}</Text> (the “Hotel”), property or equipment by the client or contractor of the client or the client’s guests attending the event and the client shall reimburse the hotel for any such damage that may be caused.
                    </Text>
                </View>

                {/* LIMITATION OF LIABILITY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>LIMITATION OF LIABILITY</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        Except for damages covered by the indemnifying entity’s indemnification obligations as set forth in the Section titled "Indemnification and Hold Harmless," neither entity shall be liable to the other for any special, indirect, incidental, consequential, punitive or exemplary damages even if such entity has knowledge of the possibility of such damages, provided that in no event shall either entity be liable to the other for any lost profits.
                    </Text>
                </View>

                {/* GOVERNING LAWS, JURISDICTION AND DISPUTE RESOLUTION */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>GOVERNING LAWS, JURISDICTION AND DISPUTE RESOLUTION</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        This Agreement, the construction and enforcement of its terms and the interpretation of the rights and duties of the parties hereto shall be subject to and governed by the laws of India. The parties hereby submit to the exclusive jurisdiction of the courts of <Text style={styles.bold}>{data.jurisdiction || 'Jaipur Rajasthan'}</Text> only. If any dispute or difference shall at any time arise between the Parties relating to or arising out of the terms of this Agreement (whether during the continuance of this Agreement or upon or after its termination), and no amicable resolution or settlement is reached within a period of Thirty (30) days, Such disputes and/or differences shall be subject to the exclusive jurisdiction of the courts of <Text style={styles.bold}>{data.jurisdiction || 'Jaipur Rajasthan'}</Text> only.
                    </Text>
                </View>

                {/* DECOR, PRODUCTION & TECHNICAL GUIDELINES */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>DECOR, PRODUCTION & TECHNICAL GUIDELINES</Text>
                    {['Decor must comply with venue guidelines',
                        'No drilling, nailing, or permanent fixing',
                        'Setup and dismantling timings are mandatory',
                        'Poolside and restricted areas require written permission'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* AUDIO, LIGHT & DRONE POLICY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>AUDIO, LIGHT & DRONE POLICY</Text>
                    {['Sound restrictions as per local authority norms',
                        `DJ/music cutoff time: ${formatTime(data.djCutoffTime) || '[Time]'}`,
                        'Drone usage allowed only with written approval and legal permits',
                        'Poolside and restricted areas excluded unless permitted'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text style={i === 1 ? styles.bold : {}}>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* LIABILITY & DAMAGES */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>LIABILITY & DAMAGES</Text>
                    {['Any damage caused by guests or vendors will be chargeable',
                        'Venue and Agency are not responsible for loss of personal belongings',
                        'Client indemnifies venue and agency against misconduct or violations'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* SAFETY & COMPLIANCE */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>SAFETY & COMPLIANCE</Text>
                    {['Fire safety, crowd control, and emergency protocols to be followed',
                        'Event to comply with local laws and government regulations',
                        'No illegal or prohibited activities allowed'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                </View>

                {/* INDEMNITY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>INDEMNITY</Text>
                    <Text style={{ marginBottom: 5 }}>The Client and Hotel agree to indemnify and hold harmless the Management Agency from:</Text>
                    {['Legal claims',
                        'Penalties',
                        'Vendor disputes',
                        'Licensing violations',
                        'Guest misconduct'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                    <Text style={{ marginTop: 5 }}>This clause survives termination.</Text>
                </View>

                {/* FORCE MAJEURE */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>FORCE MAJEURE</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        The Management Agency shall not be liable for delays or failures due to events beyond control including natural disasters, government orders, pandemics, or curfews.
                        All payments remain non-refundable.
                    </Text>
                </View>

                {/* TERMINATION */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>TERMINATION</Text>
                    <Text style={{ marginBottom: 5 }}>The Management Agency may terminate the Agreement with immediate effect in case of:</Text>
                    {['Payment defaults',
                        'Client interference',
                        'Breach of terms',
                        'Reputational risk'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                    <Text style={{ marginTop: 5 }}>All dues become immediately payable.</Text>
                </View>

                {/* CLIENT RESPONSIBILITIES */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>CLIENT RESPONSIBILITIES</Text>
                    <Text style={{ marginBottom: 5 }}>The Client shall:</Text>
                    {['Ensure guest discipline',
                        'Be liable for guest',
                        'Ensure compliance with laws',
                        'Provide accurate information and approvals'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                    <Text style={{ marginTop: 5 }}>Failure releases the Management Agency from liability.</Text>
                </View>

                {/* INTELLECTUAL PROPERTY & PROMOTION */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>INTELLECTUAL PROPERTY & PROMOTION</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        All event concepts, designs, and plans remain the intellectual property of the Management Agency.
                        The Agency may use event content for marketing unless restricted in writing.
                    </Text>
                </View>

                {/* LICENSES & PERMISSIONS POLICY */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>LICENSES & PERMISSIONS POLICY (HOTEL GUIDELINES)</Text>
                    <Text style={{ marginBottom: 5 }}>All statutory licences including but not limited to:</Text>
                    {['Liquor license',
                        'PPL',
                        'IPRS',
                        'NOVEX',
                        'Sound license and any kind off other license.'].map((item, i) => (
                            <View key={i} style={styles.bulletPoint}>
                                <Text style={styles.bullet}>•</Text>
                                <Text>{item}</Text>
                            </View>
                        ))}
                    <Text style={{ marginTop: 5 }}>
                        Shall be arranged and paid for by the Client.
                        The Management Agency and Hotel shall not be liable for denial or delay of approvals.
                    </Text>
                </View>

                {/* ENTIRE AGREEMENT */}
                <View style={styles.section}>
                    <Text style={[styles.bold, { marginBottom: 5 }]}>ENTIRE AGREEMENT</Text>
                    <Text style={{ textAlign: 'justify' }}>
                        This document constitutes the entire agreement and supersedes all prior discussions.
                        Any amendment must be in writing and signed by the Management Agency.
                    </Text>
                </View>

                {/* AGREED AND ACCEPTED */}
                <View style={[styles.section, { marginTop: 15 }]}>
                    <Text style={[styles.bold, { marginBottom: 15 }]}>
                        AGREED AND ACCEPTED BY <Text style={{ backgroundColor: 'transparent' }}>{data.clientName || 'Client Name'}</Text>. AND SHAADI PLATFORM BY NOSH N SHOTS.
                    </Text>
                    <View style={styles.table}>
                        {/* Header Row - dashed lines placeholder for signature */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCol, { height: 50, borderRightWidth: 0, borderBottomWidth: 1 }]}></View>
                            <View style={[styles.tableCol, { height: 50, borderLeftWidth: 1, borderBottomWidth: 1 }]}></View>
                        </View>
                        {/* Labels Row */}
                        <View style={styles.tableRow}>
                            <View style={[styles.tableCol, { borderTopWidth: 0, flexDirection: 'row', gap: 60 }]}>
                                <Text style={[styles.tableCell, styles.bold]}>Signature</Text>
                                <Text style={[styles.tableCell, styles.bold]}>Date</Text>
                            </View>
                            <View style={[styles.tableCol, { borderLeftWidth: 1, borderTopWidth: 0, flexDirection: 'row', gap: 60 }]}>
                                <Text style={[styles.tableCell, styles.bold]}>Signature</Text>
                                <Text style={[styles.tableCell, styles.bold]}>Date</Text>
                            </View>
                        </View>
                        {/* Inputs Row 1 */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>SHIVANI S BHARDWAJ</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, { backgroundColor: 'transparent', fontWeight: 'bold' }]}>CLIENT NAME: {data.clientName || 'CLIENT NAME'}</Text></View>
                        </View>
                        {/* Inputs Row 2 */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>DIRECTOR</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, { backgroundColor: 'transparent', fontWeight: 'bold' }]}>EMAIL: {data.signatureEmail}</Text></View>
                        </View>
                        {/* Inputs Row 3 */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.bold]}>SHAADI PLATFORM BY NOSH N SHOTS</Text></View>
                            <View style={styles.tableCol}><Text style={[styles.tableCell, { backgroundColor: 'transparent', fontWeight: 'bold' }]}>CONTACT NO: {data.signatureContact}</Text></View>
                        </View>
                    </View>
                </View>

                {/* Fixed Footer for all pages */}
                <View style={styles.footer} fixed>
                    <Text style={styles.footerTextLeft}>{data.clientName || 'CLIENT NAME'}</Text>
                    <Text style={{ fontFamily: 'Helvetica-Bold' }}>MS. SHIVANI</Text>
                </View>
            </Page>
        </Document>
    );
};

export default AgreementDocument;
