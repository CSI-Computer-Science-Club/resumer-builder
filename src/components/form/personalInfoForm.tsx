'use client'

import { useState, useEffect } from 'react';
import { PersonalInfo, SimpleInfo } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PersonalInfoProps {
    data: PersonalInfo,
    onUpdate: (data: PersonalInfo) => void;
}


export default function PersonalInfoForm({ data, onUpdate}: PersonalInfoProps) {
    const [formData, setFormData] = useState<PersonalInfo>(data);
    const [canAddAdditionalInfo, setCanAddAdditionalInfo] = useState<boolean>(() => (data.additionalInfo?.length || 0) < 4);

    const handleInputChange = (field: keyof Omit<PersonalInfo, 'additionalInfo'>, value: string) => {
        const updated = { ...formData, [field]:value };
        setFormData(updated);
        onUpdate(updated);
    }

    const handleAdditionalInfoChange = (index: number, field: keyof SimpleInfo, value: string | boolean) => {
        const updatedInfo = [...(formData.additionalInfo || [])];
        updatedInfo[index] = { ...updatedInfo[index], [field]: value };
        const updated = { ...formData, additionalInfo: updatedInfo };
        setFormData(updated);
        onUpdate(updated);
    }

    const addAdditionalInfo = () => {
        if (canAddAdditionalInfo){
            const updated = { 
                ...formData, 
                additionalInfo: [...(formData.additionalInfo || []), {title: "", value: "", isLink: false}]
            };
            setFormData(updated);
            onUpdate(updated);
        }
    }

    const removeAdditionalInfo = (index: number) => {
        const updated = {
            ...formData,
            additionalInfo: formData.additionalInfo?.filter((_, i) => i !== index)
        }
        setFormData(updated);
        onUpdate(updated);
    }


    useEffect(() => {
        if (formData.additionalInfo){
            setCanAddAdditionalInfo(formData.additionalInfo.length < 4);
        }
        else {
            setCanAddAdditionalInfo(true);
        }
    }, [formData.additionalInfo])


    return (
        <div className="space-y-6">
            {/* Basic Information */}
            <Card>
                <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="John"
                    required
                />
                <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Doe"
                    required
                />
                <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                />
                <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                />
                <Input
                    label="Location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                    required
                />
                </CardContent>
            </Card>

            {/* Professional Links */}
            <Card>
                <CardHeader>
                <CardTitle className="text-lg">Professional Links</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                        label="LinkedIn"
                        value={formData.linkedIn || ''}
                        onChange={(e) => handleInputChange('linkedIn', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        required
                    />
                    <Input
                        label="Website"
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        placeholder="https://yourwebsite.com"
                    />
                    <Input
                        label="GitHub"
                        value={formData.github || ''}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        placeholder="https://github.com/username"
                    />
                </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
                <CardHeader>
                <CardTitle className="text-lg">Additional Information</CardTitle>
                <p className="text-sm text-gray-600">
                    Add any additional links or information you&apos;d like to include
                </p>
                </CardHeader>
                <CardContent className="space-y-4">
                {formData.additionalInfo?.map((info, index) => (
                    <div key={index} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-3">
                        <Input
                        label={index === 0 ? "Title" : ""}
                        value={info.title}
                        onChange={(e) => handleAdditionalInfoChange(index, 'title', e.target.value)}
                        placeholder="Misc"
                        />
                    </div>
                    <div className="col-span-6">
                        <Input
                        label={index === 0 ? "Value" : ""}
                        value={info.value}
                        onChange={(e) => handleAdditionalInfoChange(index, 'value', e.target.value)}
                        placeholder="https://myportfolio.com"
                        />
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                        <input
                        type="checkbox"
                        checked={info.isLink}
                        onChange={(e) => handleAdditionalInfoChange(index, 'isLink', e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="text-sm text-gray-600">Is Link</label>
                    </div>
                    <div className="col-span-1">
                        <Button
                        variant="remove"
                        size="md"
                        onClick={() => removeAdditionalInfo(index)}
                        >
                        </Button>
                    </div>
                    </div>
                ))}
                <div className="flex">
                    <Button
                        variant="add"
                        onClick={addAdditionalInfo}
                        disabled={!canAddAdditionalInfo}
                        size='md'
                        className='flex mx-auto'
                    >
                    </Button>
                </div>
                </CardContent>
            </Card>
        </div>
    )
}