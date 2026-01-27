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
                        label="Client Name (Footer)"
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
                <SectionHeader title="Client Details" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Client Name (for PDF Section)"
                        value={data.clientDetailsName}
                        onChange={(e) => updateData('clientDetailsName', e.target.value)}
                        placeholder="e.g. Rahul Verma"
                    />
                    <InputGroup
                        label="Client Contact No"
                        type="tel"
                        value={data.clientDetailsPhone}
                        onChange={(e) => updateData('clientDetailsPhone', e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                    />
                    <div className="md:col-span-2">
                        <InputGroup
                            label="Client Address"
                            value={data.clientDetailsAddress}
                            onChange={(e) => updateData('clientDetailsAddress', e.target.value)}
                            rows={2}
                            placeholder="Full residential address"
                        />
                    </div>
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
                <SectionHeader title="Accommodation Allocation Details" />
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Room Allocation</label>
                        <div className="space-y-3">
                            {data.accommodationDetails?.map((detail, index) => (
                                <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Arrival"
                                            value={detail.arrival}
                                            onChange={(e) => {
                                                const newDetails = [...data.accommodationDetails];
                                                newDetails[index].arrival = e.target.value;
                                                updateData('accommodationDetails', newDetails);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Time"
                                            value={detail.time}
                                            onChange={(e) => {
                                                const newDetails = [...data.accommodationDetails];
                                                newDetails[index].time = e.target.value;
                                                updateData('accommodationDetails', newDetails);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-[2]">
                                        <input
                                            type="text"
                                            placeholder="Total Rooms"
                                            value={detail.totalRooms}
                                            onChange={(e) => {
                                                const newDetails = [...data.accommodationDetails];
                                                newDetails[index].totalRooms = e.target.value;
                                                updateData('accommodationDetails', newDetails);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Rates"
                                            value={detail.rates}
                                            onChange={(e) => {
                                                const newDetails = [...data.accommodationDetails];
                                                newDetails[index].rates = e.target.value;
                                                updateData('accommodationDetails', newDetails);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    {data.accommodationDetails.length > 1 && (
                                        <button
                                            onClick={() => {
                                                const newDetails = data.accommodationDetails.filter((_, i) => i !== index);
                                                updateData('accommodationDetails', newDetails);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove Row"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newDetails = [...data.accommodationDetails, { arrival: '', time: '', totalRooms: '', rates: '' }];
                                    updateData('accommodationDetails', newDetails);
                                }}
                                className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add Row
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Inclusions" />
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Inclusion Items</label>
                        <div className="space-y-3">
                            {data.inclusions?.map((item, index) => (
                                <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <textarea
                                            rows={2}
                                            placeholder="Inclusion Details (e.g. Welcome drink on arrival)"
                                            value={item}
                                            onChange={(e) => {
                                                const newInc = [...data.inclusions];
                                                newInc[index] = e.target.value;
                                                updateData('inclusions', newInc);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-3 border"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newInc = data.inclusions.filter((_, i) => i !== index);
                                            updateData('inclusions', newInc);
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
                                        title="Remove Item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newInc = [...data.inclusions, ''];
                                    updateData('inclusions', newInc);
                                }}
                                className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Note" />
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Note Items</label>
                        <div className="space-y-3">
                            {data.notes?.map((item, index) => (
                                <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <textarea
                                            rows={2}
                                            placeholder="Note Details"
                                            value={item}
                                            onChange={(e) => {
                                                const newNotes = [...data.notes];
                                                newNotes[index] = e.target.value;
                                                updateData('notes', newNotes);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-3 border"
                                        />
                                    </div>
                                    <button
                                        onClick={() => {
                                            const newNotes = data.notes.filter((_, i) => i !== index);
                                            updateData('notes', newNotes);
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-2"
                                        title="Remove Item"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newNotes = [...data.notes, ''];
                                    updateData('notes', newNotes);
                                }}
                                className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add Note Item
                            </button>
                        </div>
                    </div>
                </div>
            </section>



            <section>
                <SectionHeader title="Menu Grid" />
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <div className="flex gap-2 mb-2 font-semibold text-sm text-gray-700">
                            <div className="flex-1">Lunch (Veg)</div>
                            <div className="flex-1">Dinner (Veg)</div>
                            <div className="flex-1">Hi-Tea</div>
                            <div className="w-8"></div>
                        </div>
                        <div className="space-y-3">
                            {data.menuGrid?.map((row, index) => (
                                <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Lunch Item"
                                            value={row.lunch}
                                            onChange={(e) => {
                                                const newGrid = [...data.menuGrid];
                                                newGrid[index].lunch = e.target.value;
                                                updateData('menuGrid', newGrid);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Dinner Item"
                                            value={row.dinner}
                                            onChange={(e) => {
                                                const newGrid = [...data.menuGrid];
                                                newGrid[index].dinner = e.target.value;
                                                updateData('menuGrid', newGrid);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Hi-Tea Item"
                                            value={row.hiTea}
                                            onChange={(e) => {
                                                const newGrid = [...data.menuGrid];
                                                newGrid[index].hiTea = e.target.value;
                                                updateData('menuGrid', newGrid);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    {data.menuGrid.length > 1 && (
                                        <button
                                            onClick={() => {
                                                const newGrid = data.menuGrid.filter((_, i) => i !== index);
                                                updateData('menuGrid', newGrid);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove Row"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newGrid = [...data.menuGrid, { lunch: '', dinner: '', hiTea: '' }];
                                    updateData('menuGrid', newGrid);
                                }}
                                className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add Row
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Payment Details" />
                <div className="grid grid-cols-1 gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputGroup
                            label="Total Contract Value / Currency"
                            value={data.currency}
                            onChange={(e) => updateData('currency', e.target.value)}
                            placeholder="e.g. 5,00,000 or INR"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700">Additional Payment Details</label>
                        {(data.additionalPaymentText || []).map((text, index) => (
                            <div key={index} className="flex gap-2 items-center">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={(e) => {
                                        const newText = [...(data.additionalPaymentText || [])];
                                        newText[index] = e.target.value;
                                        updateData('additionalPaymentText', newText);
                                    }}
                                    placeholder="e.g. INR 1,12,500.00 to be deposited as token..."
                                    className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                />
                                <button
                                    onClick={() => {
                                        const newText = data.additionalPaymentText.filter((_, i) => i !== index);
                                        updateData('additionalPaymentText', newText);
                                    }}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Remove Line"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                const newText = [...(data.additionalPaymentText || []), ''];
                                updateData('additionalPaymentText', newText);
                            }}
                            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            Add Line
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">Payment Link Note (Use **text** for bold)</label>
                        <textarea
                            rows={3}
                            value={data.paymentNote || ''}
                            onChange={(e) => updateData('paymentNote', e.target.value)}
                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-3 border"
                            placeholder="Note text..."
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputGroup
                            label="Scheduled Advance Date"
                            type="date"
                            value={data.scheduledAdvanceDate}
                            onChange={(e) => updateData('scheduledAdvanceDate', e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Terms</label>
                    <div className="space-y-3">
                        {data.paymentTerms?.map((term, index) => (
                            <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Date / Milestone"
                                        value={term.date}
                                        onChange={(e) => {
                                            const newTerms = [...data.paymentTerms];
                                            newTerms[index].date = e.target.value;
                                            updateData('paymentTerms', newTerms);
                                        }}
                                        className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                    />
                                </div>
                                <div className="flex-[2]">
                                    <input
                                        type="text"
                                        placeholder="Particulars"
                                        value={term.particulars}
                                        onChange={(e) => {
                                            const newTerms = [...data.paymentTerms];
                                            newTerms[index].particulars = e.target.value;
                                            updateData('paymentTerms', newTerms);
                                        }}
                                        className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                    />
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder="Amount"
                                        value={term.amount}
                                        onChange={(e) => {
                                            const newTerms = [...data.paymentTerms];
                                            newTerms[index].amount = e.target.value;
                                            updateData('paymentTerms', newTerms);
                                        }}
                                        className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                    />
                                </div>
                                {data.paymentTerms.length > 1 && (
                                    <button
                                        onClick={() => {
                                            const newTerms = data.paymentTerms.filter((_, i) => i !== index);
                                            updateData('paymentTerms', newTerms);
                                        }}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove Row"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                const newTerms = [...data.paymentTerms, { date: '', particulars: '', amount: '' }];
                                updateData('paymentTerms', newTerms);
                            }}
                            className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                            Add Row
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <SectionHeader title="Legal Information" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputGroup
                        label="Jurisdiction City / State"
                        value={data.jurisdiction}
                        onChange={(e) => updateData('jurisdiction', e.target.value)}
                        placeholder="e.g. Jaipur Rajasthan"
                    />
                </div>
            </section>

            <section>
                <SectionHeader title="Cancellation & Refund Policy" />
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cancellation Terms</label>
                        <div className="space-y-3">
                            {data.cancellationPolicy?.map((term, index) => (
                                <div key={index} className="flex gap-2 items-start bg-gray-50/50 p-2 rounded-lg border border-gray-200">
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Notification Period"
                                            value={term.period}
                                            onChange={(e) => {
                                                const newTerms = [...data.cancellationPolicy];
                                                newTerms[index].period = e.target.value;
                                                updateData('cancellationPolicy', newTerms);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    <div className="flex-[2]">
                                        <input
                                            type="text"
                                            placeholder="Cancellation Fee"
                                            value={term.fee}
                                            onChange={(e) => {
                                                const newTerms = [...data.cancellationPolicy];
                                                newTerms[index].fee = e.target.value;
                                                updateData('cancellationPolicy', newTerms);
                                            }}
                                            className="block w-full rounded-lg border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 text-sm p-2 border"
                                        />
                                    </div>
                                    {data.cancellationPolicy.length > 1 && (
                                        <button
                                            onClick={() => {
                                                const newTerms = data.cancellationPolicy.filter((_, i) => i !== index);
                                                updateData('cancellationPolicy', newTerms);
                                            }}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove Row"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    const newTerms = [...data.cancellationPolicy, { period: '', fee: '' }];
                                    updateData('cancellationPolicy', newTerms);
                                }}
                                className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                Add Row
                            </button>
                        </div>
                    </div>
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
        </div >
    );
};

export default AgreementForm;
