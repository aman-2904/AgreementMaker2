import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import AgreementDocument from './components/PDF/AgreementDocument';
import AgreementForm from './components/Form/AgreementForm';
import { FileDown, Printer } from 'lucide-react';

function App() {
  const [agreementData, setAgreementData] = useState({
    agreementDate: new Date().toISOString().split('T')[0],
    clientName: '',
    clientDetailsName: '',
    clientDetailsPhone: '',
    clientDetailsAddress: '',
    djCutoffTime: '',
    hotelName: '',
    hotelAddress: '',
    hotelContactNumber: '',
    eventName: '',
    brideGroomName: '',
    eventDates: '',
    numberOfGuests: '',
    venueAreas: '',
    currency: '',
    jurisdiction: '',
    scheduledAdvanceDate: '',
    paymentTerms: [
      { date: 'Date of Signing Contract', particulars: '30 % of overall total as Initial Deposit', amount: '' },
      { date: '90 days prior to event', particulars: '30 % of overall total as Second Deposit', amount: '' },
      { date: '60 days prior to event', particulars: '20 % of overall total as Third Deposit', amount: '' },
      { date: '30 Days prior to event', particulars: '20 % of overall total as final deposit', amount: '' },
    ],
    signatureEmail: '',
    signatureContact: '',
    cancellationPolicy: [
      { period: 'More than 180 days', fee: '25 % of Total Estimated Revenue (plus applicable taxes)' },
      { period: 'Between 180- 120 days', fee: '50 % of Total Estimated Revenue (plus applicable taxes)' },
      { period: 'Between 120-90 days', fee: '75 % of Total Estimated Revenue (plus applicable taxes)' },
    ],
    accommodationDetails: [
      { arrival: "28th Apr'2026", time: "1500 Hours", totalRooms: "50 Rooms (100 pax)", rates: "20,400.00" },
      { arrival: "29th Apr'2026", time: "1500 Hours", totalRooms: "120Rooms (240 guests)", rates: "27,000.00" },
      { arrival: "30th Apr'2026", time: "Stay Over", totalRooms: "120 Rooms (240 guests)", rates: "27,000.00" },
    ],
    inclusions: [
      'Mix of room categories: 36 Fire Villa (A Block), 10 Bamboo Villa, and 2 Earth Villa (4 Rooms) on 28th Apr’2026',
      'Mix of room categories: 36 Fire Villa (A Block), 36 Fire Villa (B Block), 18 Bamboo Villa, 3 Earth Villa (6 Rooms), 24 Lagoon Villa on 29th & 30th Apr’2026',
      'Buffet breakfast at designated area on 29th, 30th Apr., and 01st May’2026',
      'Buffet Hi tea and buffet dinner at Nilgiri Hall for 29th Apr’2026',
      'Buffet lunch and buffet dinner at exclusive venue for 29th & 30th Apr’2026.',
      'Aravali Banquet Hall, Aravali Lawn, Pool Deck, Nilgiri lawn, Nilgiri Hall will be part of the package for the rituals and the wedding ceremonies for 2 days.',
      'Iron/iron board in all the rooms.',
      'Welcome drink on arrival.',
      'Tea/coffee maker facility in the room.',
      'Swimming pool is included. (as per government guidelines with costume mandatory)',
      'Wi-Fi in all rooms.',
      '04 bottles of mineral water (500ml) in room replenish daily.',
    ],
    notes: [
      '02 Welcome drink and 1 dry sweet on Arrival',
      'Recce room rates from Sunday to Thursday at INR 9000 + Taxes as per availability',
      'Stay for event team at INR 12000+ taxes CP.',
      '8 room’s ironing (4 rooms bride’s side & 4 rooms groom’s side)',
      'Extra person on 28th Apr’2026 at INR 8,000 MAP plus tax',
      'Extra person on 29th & 30th Apr’2026 at INR 12,000 AP plus taxes',
      'Kids up to 8yrs. will be on a complimentary basis',
      'Kids from 9 to 12yrs will be at 50% charges of the extra person rates',
      'Kids above 12yrs. to be considered as adult',
      'Alcohol Discount -',
      'After Party Food – either supper @ 1000 plus tax which includes 02 starter, 01 main course, Maggie & 01 dessert or from chai adda',
      'Music Licenses will be required as applicable',
      'Chai adda, Chaat & Salon can be outsourced',
      'German hanger if utilized will be charged as per rental decided by management.',
      'Décor from the in-house vendor.',
    ]
  });

  const updateAgreementData = (field, value) => {
    setAgreementData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-sans overflow-hidden">
      {/* Left Panel - Form */}
      <div className="w-1/2 h-full flex flex-col border-r border-white/20 bg-white/70 backdrop-blur-xl shadow-2xl z-10">
        <div className="p-6 border-b border-gray-200/50 flex justify-between items-center bg-white/50">
          <div>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Contract Maker
            </h1>
            <p className="text-sm text-gray-500 mt-1">Generate pixel-perfect agreements instantly.</p>
          </div>

          <PDFDownloadLink
            document={<AgreementDocument data={agreementData} />}
            fileName={`Agreement_${agreementData.clientName || 'Client'}.pdf`}
          >
            {({ blob, url, loading, error }) => (
              <button
                disabled={loading}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 ${loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-indigo-500/30'
                  }`}
              >
                <FileDown size={18} />
                {loading ? 'Generating...' : 'Download PDF'}
              </button>
            )}
          </PDFDownloadLink>
        </div>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AgreementForm data={agreementData} updateData={updateAgreementData} />
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 h-full bg-gray-100/50 p-8 flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
        <div className="w-full h-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200/50 flex flex-col">
          <div className="bg-gray-800 text-white px-4 py-2 text-sm flex items-center gap-2">
            <Printer size={16} />
            <span>Live Preview</span>
          </div>
          <PDFViewer className="w-full h-full border-none">
            <AgreementDocument data={agreementData} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

export default App;
