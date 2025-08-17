'use client';

import { Education } from '@/types/resume';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { MAX_EDUCATIONS, MAX_HONORS_CHARS } from '@/config/resumeLimits';
import { DEGREE_TYPES } from '@/config/degreeTypes';

interface EducationFormProps {
  data: Education[];
  onUpdate: (data: Education[]) => void;
}

export function EducationForm({ data, onUpdate }: EducationFormProps) {
  const addEducation = () => {
    if (data.length >= MAX_EDUCATIONS) return; // guard
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: null,
      current: false,
      gpa: '',
      honors: '',
    };
    onUpdate([...data, newEducation]);
  };

  const patch = (id: string, changes: Partial<Education>) => {
    const updated = data.map((edu) => (edu.id === id ? { ...edu, ...changes } : edu));
    onUpdate(updated);
  };

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id));
  };

  const updateHonors = (id: string, value: string) => {
    patch(id, { honors: value.slice(0, MAX_HONORS_CHARS) });
  };

  const updateGpa = (id: string, value: string) => {
    const v = value.replace(/[^0-9.]/g, '');
    patch(id, { gpa: v.slice(0, 4) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button
          onClick={addEducation}
          variant="outline"
          className="cursor-pointer"
          disabled={data.length >= MAX_EDUCATIONS}
        >
          Add Education
        </Button>
      </div>

      {data.length >= MAX_EDUCATIONS && (
        <p className="text-sm text-gray-500">You can add up to {MAX_EDUCATIONS} education entries.</p>
      )}

      {data.map((education) => {
        const isPreset = DEGREE_TYPES.includes(education.degree);

        return (
          <Card key={education.id} className="bg-white">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Education</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeEducation(education.id)}
                  className="cursor-pointer"
                >
                  Remove
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                label="Institution/School Name"
                value={education.institution}
                onChange={(e) => patch(education.id, { institution: e.target.value })}
                placeholder="University of Technology"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Degree with basic “Other” flow */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">Degree Type</label>

                  <select
                    value={isPreset ? education.degree : 'Other'}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'Other') {
                        // switching from preset to custom: clear to start typing
                        if (isPreset) patch(education.id, { degree: '' });
                      } else {
                        patch(education.id, { degree: val });
                      }
                    }}
                    className="border rounded p-2 w-full"
                  >
                    <option value="">Select degree</option>
                    {DEGREE_TYPES.map((deg) => (
                      <option key={deg} value={deg}>
                        {deg}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>

                  {/* show text input when value is not one of the presets */}
                  {(!isPreset || education.degree === 'Other') && (
                    <input
                      type="text"
                      placeholder="Enter your degree"
                      value={isPreset ? '' : education.degree}
                      onChange={(e) => patch(education.id, { degree: e.target.value })}
                      className="border rounded p-2 w-full mt-2"
                      maxLength={80}
                    />
                  )}
                </div>

                <Input
                  label="Field of Study"
                  value={education.field}
                  onChange={(e) => patch(education.id, { field: e.target.value })}
                  placeholder="Computer Science"
                  maxLength={60}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={education.startDate}
                  onChange={(e) => patch(education.id, { startDate: e.target.value })}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={education.endDate || ''}
                  onChange={(e) => patch(education.id, { endDate: e.target.value || null })}
                  disabled={education.current}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id={`edu-current-${education.id}`}
                  type="checkbox"
                  checked={education.current}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    // atomic update
                    patch(education.id, {
                      current: checked,
                      endDate: checked ? null : education.endDate,
                    });
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="text-sm text-gray-600" htmlFor={`edu-current-${education.id}`}>
                  Currently attending
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="GPA (Optional)"
                  value={education.gpa || ''}
                  onChange={(e) => updateGpa(education.id, e.target.value)}
                  placeholder="3.8/4.0"
                />
                <div className="flex flex-col">
                  <Input
                    label="Honors/Awards (Optional)"
                    value={education.honors || ''}
                    onChange={(e) => updateHonors(education.id, e.target.value)}
                    placeholder="Summa Cum Laude"
                    maxLength={MAX_HONORS_CHARS}
                  />
                  <span className="mt-1 self-end text-xs text-gray-500">
                    {(education.honors?.length ?? 0)}/{MAX_HONORS_CHARS}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No education added yet</p>
          <Button onClick={addEducation} className="cursor-pointer">
            Add Your First Education
          </Button>
        </div>
      )}
    </div>
  );
}
