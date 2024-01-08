import React from 'react'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const CaseForm = ({ handleChange, handleSubmit, formData, errors }) => {
    return (
        <form
            className="max-w-md mx-auto p-4 bg-white rounded shadow-md"
            onSubmit={handleSubmit}
        >
            <section>
                <h2 className="text-lg font-bold mb-2">Case Information</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="caseNumber" className="block mb-2 text-sm font-bold">
                            Case Number:
                        </Label>
                        <Input
                            type="text"
                            id="caseNumber"
                            name="caseNumber"
                            value={formData.caseNumber}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.caseNumber && (
                            <div className="text-red-500 text-sm">{errors.caseNumber}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="reportedBy" className="block mb-2 text-sm font-bold">
                            Reported By:
                        </Label>
                        <Input
                            type="text"
                            id="reportedBy"
                            name="reportedBy"
                            value={formData.reportedBy}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.reportedBy && (
                            <div className="text-red-500 text-sm">{errors.reportedBy}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="dateReported" className="block mb-2 text-sm font-bold">
                            Date Reported:
                        </Label>
                        <Input
                            type="date"
                            id="dateReported"
                            name="dateReported"
                            value={formData.dateReported}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.dateReported && (
                            <div className="text-red-500 text-sm">{errors.dateReported}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="incidentType" className="block mb-2 text-sm font-bold">
                            Incident Type:
                        </Label>
                        <select
                            id="incidentType"
                            name="incidentType"
                            value={formData.incidentType}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="" disabled>
                                Select Incident Type
                            </option>
                            <option value="Theft">Theft</option>
                            <option value="Assault">Assault</option>

                        </select>
                        {errors.incidentType && (
                            <div className="text-red-500 text-sm">{errors.incidentType}</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-bold mb-2">Location Information</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="longitude" className="block mb-2 text-sm font-bold">
                            Longitude:
                        </Label>
                        <Input
                            type="text"
                            id="longitude"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.longitude && (
                            <div className="text-red-500 text-sm">{errors.longitude}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="latitude" className="block mb-2 text-sm font-bold">
                            Latitude:
                        </Label>
                        <Input
                            type="text"
                            id="latitude"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.latitude && (
                            <div className="text-red-500 text-sm">{errors.latitude}</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-bold mb-2">Case Details</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="description" className="block mb-2 text-sm font-bold">
                            Description:
                        </Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        ></Textarea>
                        {errors.description && (
                            <div className="text-red-500 text-sm">{errors.description}</div>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="status" className="block mb-2 text-sm font-bold">
                            Status:
                        </Label>
                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="Pending">Pending</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Closed">Closed</option>
                        </select>
                        {errors.status && (
                            <div className="text-red-500 text-sm">{errors.status}</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-bold mb-2">Assigned Officer</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="assignedOfficer" className="block mb-2 text-sm font-bold">
                            Assigned Officer:
                        </Label>
                        <Input
                            type="text"
                            id="assignedOfficer"
                            name="assignedOfficer"
                            value={formData.assignedOfficer}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                        {errors.assignedOfficer && (
                            <div className="text-red-500 text-sm">{errors.assignedOfficer}</div>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-6">
                <h2 className="text-lg font-bold mb-2">Evidence</h2>

                <div>
                    <Label htmlFor="evidence" className="block mb-2 text-sm font-bold">
                        Evidence:
                    </Label>
                    <Textarea
                        id="evidence"
                        name="evidence"
                        value={formData.evidence}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></Textarea>
                    {errors.evidence && (
                        <div className="text-red-500 text-sm">{errors.evidence}</div>
                    )}
                </div>
            </section>

            <Button
                type="submit"
                className="w-full p-2 mt-6 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit
            </Button>
        </form>
    )
}

export default CaseForm
