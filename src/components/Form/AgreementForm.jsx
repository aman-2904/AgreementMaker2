import React from 'react';

const InputGroup = ({ label, type = "text", value, onChange, placeholder, rows, options }) => (
    <div className="group">
        <label className="block text-sm font-semibold text-gray-700 mb-1.5 transition-colors group-focus-within:text-indigo-600">
            {label}
        </label>
        {rows ? (
            <textarea
                value={value}
                onChange={onChange}
                rows={rows}
                className="block w-full rounded-lg border-gray-300 bg-gray-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 focus:bg-white transition-all duration-200 text-sm p-3 border hover:border-indigo-300"
                placeholder={placeholder}
            />
        ) : options ? (
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="block w-full appearance-none rounded-lg border-gray-300 bg-gray-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 focus:bg-white transition-all duration-200 text-sm p-3 border hover:border-indigo-300 pr-8"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        ) : (
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="block w-full rounded-lg border-gray-300 bg-gray-50/50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 focus:bg-white transition-all duration-200 text-sm p-3 border hover:border-indigo-300"
            />
        )}
    </div>
);

const SectionHeader = ({ title }) => (
    <div className="mb-6 mt-2 relative">
        <h2 className="text-lg font-bold text-gray-800 relative z-10 inline-block px-1 bg-white/0">
            {title}
        </h2>
        <div className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-200 to-transparent rounded-full"></div>
    </div>
);

const AgreementForm = ({ data, updateData }) => {
    return (
        <div className="space-y-10">
            <section>
                <SectionHeader title="Agreement Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Agreement Date"
                        type="date"
                        value={data.agreementDate}
                        onChange={(e) => updateData('agreementDate', e.target.value)}
                    />
                    <InputGroup
                        label="Client Name"
                        value={data.clientName}
                        onChange={(e) => updateData('clientName', e.target.value)}
                        placeholder="e.g. Rahul Verma"
                    />
                    <InputGroup
                        label="DJ/Music Cutoff Time"
                        type="time"
                        value={data.djCutoffTime}
                        onChange={(e) => updateData('djCutoffTime', e.target.value)}
                    />
                </div>
            </section>

            <section>
                <SectionHeader title="Hotel / Wedding Venue Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <InputGroup
                            label="Hotel / Venue Name"
                            value={data.hotelName}
                            onChange={(e) => updateData('hotelName', e.target.value)}
                            placeholder="e.g. The Grand Palace"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <InputGroup
                            label="Hotel Address"
                            value={data.hotelAddress}
                            onChange={(e) => updateData('hotelAddress', e.target.value)}
                            rows={3}
                            placeholder="Full address of the venue"
                        />
                    </div>
                    <InputGroup
                        label="Contact Person Number"
                        type="tel"
                        value={data.hotelContactNumber}
                        onChange={(e) => updateData('hotelContactNumber', e.target.value)}
                        placeholder="+91 98765 43210"
                    />
                </div>
            </section>

            <section>
                <SectionHeader title="Event Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Event Name"
                        value={data.eventName}
                        onChange={(e) => updateData('eventName', e.target.value)}
                        placeholder="e.g. Wedding Celebration"
                    />
                    <InputGroup
                        label="Bride & Groom Name"
                        value={data.brideGroomName}
                        onChange={(e) => updateData('brideGroomName', e.target.value)}
                        placeholder="e.g. Rahul & Priya"
                    />
                    <InputGroup
                        label="Event Dates"
                        value={data.eventDates}
                        onChange={(e) => updateData('eventDates', e.target.value)}
                        placeholder="e.g. 12th - 14th Feb 2026"
                    />
                    <InputGroup
                        label="Number of Guests"
                        value={data.numberOfGuests}
                        onChange={(e) => updateData('numberOfGuests', e.target.value)}
                        placeholder="e.g. 500 Pax"
                    />
                    <div className="md:col-span-2">
                        <InputGroup
                            label="Venue Areas"
                            value={data.venueAreas}
                            onChange={(e) => updateData('venueAreas', e.target.value)}
                            placeholder="e.g. Ballroom, Lawn, Poolside"
                        />
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Payment Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Currency"
                        options={['INR', 'USD', 'EUR', 'GBP']}
                        value={data.currency}
                        onChange={(e) => updateData('currency', e.target.value)}
                    />
                    <InputGroup
                        label="Scheduled Advance Date"
                        type="date"
                        value={data.scheduledAdvanceDate}
                        onChange={(e) => updateData('scheduledAdvanceDate', e.target.value)}
                    />
                    <InputGroup
                        label="Initial Deposit (30%)"
                        value={data.initialDeposit}
                        onChange={(e) => updateData('initialDeposit', e.target.value)}
                        placeholder="e.g. 5,00,000"
                    />
                    <InputGroup
                        label="Second Deposit (30% - 90 Days)"
                        value={data.secondDeposit}
                        onChange={(e) => updateData('secondDeposit', e.target.value)}
                        placeholder="e.g. 5,00,000"
                    />
                    <InputGroup
                        label="Third Deposit (20% - 60 Days)"
                        value={data.thirdDeposit}
                        onChange={(e) => updateData('thirdDeposit', e.target.value)}
                        placeholder="e.g. 3,50,000"
                    />
                    <InputGroup
                        label="Final Deposit (20% - 30 Days)"
                        value={data.finalDeposit}
                        onChange={(e) => updateData('finalDeposit', e.target.value)}
                        placeholder="e.g. 3,50,000"
                    />
                </div>
            </section>

            <section>
                <SectionHeader title="Signature Section" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Client Email"
                        type="email"
                        value={data.signatureEmail}
                        onChange={(e) => updateData('signatureEmail', e.target.value)}
                        placeholder="client@example.com"
                    />
                    <InputGroup
                        label="Client Contact"
                        type="tel"
                        value={data.signatureContact}
                        onChange={(e) => updateData('signatureContact', e.target.value)}
                        placeholder="+91 98765 43210"
                    />
                </div>
            </section>
        </div>
    );
};

export default AgreementForm;
