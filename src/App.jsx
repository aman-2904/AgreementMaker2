import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import AgreementDocument from './components/PDF/AgreementDocument';
import AgreementForm from './components/Form/AgreementForm';
import { FileDown, Printer } from 'lucide-react';

function App() {
  const [agreementData, setAgreementData] = useState({
    agreementDate: new Date().toISOString().split('T')[0],
    clientName: '',
    djCutoffTime: '',
    hotelName: '',
    hotelAddress: '',
    hotelContactNumber: '',
    eventName: '',
    brideGroomName: '',
    eventDates: '',
    numberOfGuests: '',
    venueAreas: '',
    currency: 'INR',
    scheduledAdvanceDate: '',
    paymentTerms: [
      { date: 'Date of Signing Contract', particulars: '30 % of overall total as Initial Deposit', amount: 'INR' },
      { date: '90 days prior to event', particulars: '30 % of overall total as Second Deposit', amount: 'INR' },
      { date: '60 days prior to event', particulars: '20 % of overall total as Third Deposit', amount: 'INR' },
      { date: '30 Days prior to event', particulars: '20 % of overall total as final deposit', amount: 'INR' },
    ],
    signatureEmail: '',
    signatureContact: ''
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
