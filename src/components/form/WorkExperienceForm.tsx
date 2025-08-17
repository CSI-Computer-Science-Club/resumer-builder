'use client';

import { WorkExperience } from '@/types/resume';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { MAX_EXPERIENCES, MAX_BULLETS, MAX_BULLET_CHARS } from '@/config/resumeLimits';


interface WorkExperienceFormProps {
  data: WorkExperience[];
  onUpdate: (data: WorkExperience[]) => void;
}


export function WorkExperienceForm({ data, onUpdate }: WorkExperienceFormProps) {


  const addExperience = () => {
    if (data.length >= MAX_EXPERIENCES) return; // Prevent adding more
    const newExperience: WorkExperience = {
      id: `exp-${Date.now()}`, // consider uuid
      company: '',
      position: '',
      startDate: '',
      endDate: null,
      current: false,
      description: [''],
      location: ''
    };
    onUpdate([...data, newExperience]);
  };

  const patch = (id: string, changes: Partial<WorkExperience>) => {
    const updated = data.map(exp => (exp.id === id ? { ...exp, ...changes } : exp));
    onUpdate(updated);
  };

  const removeExperience = (id: string) => {
    onUpdate(data.filter(exp => exp.id !== id));
  };

  const addBulletPoint = (id: string) => {
  
  const updated = data.map(exp => {
    if (exp.id !== id) return exp;
    if (exp.description.length >= MAX_BULLETS) return exp; // stop adding
    return { ...exp, description: [...exp.description, ''] };
  });
  onUpdate(updated);
};


  const updateBulletPoint = (id: string, index: number, value: string) => {
  const updated = data.map(exp => {
    if (exp.id !== id) return exp;
    const next = exp.description.slice();
    // hard clamp
    next[index] = value.slice(0, MAX_BULLET_CHARS);
    return { ...exp, description: next };
  });
  onUpdate(updated);
};


  const removeBulletPoint = (id: string, index: number) => {
    const updated = data.map(exp => {
      if (exp.id !== id) return exp;
      const next = exp.description.filter((_, i) => i !== index);
      return { ...exp, description: next.length ? next : [''] }; // keep at least one
    });
    onUpdate(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={addExperience} variant="outline" className="cursor-pointer" disabled={data.length >= MAX_EXPERIENCES}>Add Experience</Button>
      </div>

       {data.length >= MAX_EXPERIENCES && (
        <p className="text-sm text-gray-500">
          You can add up to {MAX_EXPERIENCES} work experiences.
        </p>
      )}

      {data.map((experience) => (
        <Card key={experience.id} className="bg-white">
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Experience</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="cursor-pointer"
              >
                Remove
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Position/Role"
                value={experience.position}
                onChange={(e) => patch(experience.id, { position: e.target.value })}
                placeholder="Software Engineer"
              />
              <Input
                label="Company"
                value={experience.company}
                onChange={(e) => patch(experience.id, { company: e.target.value })}
                placeholder="Tech Company Inc."
              />
            </div>

            <Input
              label="Location"
              value={experience.location}
              onChange={(e) => patch(experience.id, { location: e.target.value })}
              placeholder="City, State"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                value={experience.startDate}
                onChange={(e) => patch(experience.id, { startDate: e.target.value })}
              />
              <Input
                label="End Date"
                type="date"
                value={experience.endDate ?? ''}
                onChange={(e) => patch(experience.id, { endDate: e.target.value || null })}
                disabled={experience.current}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                id={`current-${experience.id}`}
                type="checkbox"
                checked={experience.current}
                onChange={(e) => {
                  const checked = e.target.checked;
                  // atomic update: set current and endDate together
                  patch(experience.id, { current: checked, endDate: checked ? null : experience.endDate });
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-600" htmlFor={`current-${experience.id}`}>Currently working here</label>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Job Description</label>
              {experience.description.map((desc, index) => (
  <div key={index} className="flex flex-col gap-1">
    <div className="flex gap-2">
      <textarea
        value={desc}
        onChange={(e) => updateBulletPoint(experience.id, index, e.target.value)}
        placeholder="Describe your responsibilities and achievements..."
        className="flex-1 min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 resize-y"
        maxLength={MAX_BULLET_CHARS}
      />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeBulletPoint(experience.id, index)}
              disabled={experience.description.length === 1}
              className="cursor-pointer self-start"
            >
              Remove
            </Button>
          </div>

            {/* character counter */}
            <span className="mt-1 self-end text-xs text-gray-500">
              {desc.length}/{MAX_BULLET_CHARS}
            </span>
          </div>
        ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => addBulletPoint(experience.id)}
                className="cursor-pointer"
                disabled={experience.description.length >= MAX_BULLETS}
              >
                Add Bullet Point
              </Button>

                {experience.description.length >= MAX_BULLETS && (
                <p className="text-xs text-gray-500">
                  You can add up to {MAX_BULLETS} bullet points for this job.
                </p>
                  )}
            </div>
          </CardContent>
        </Card>
      ))}

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No work experience added yet</p>
          <Button onClick={addExperience} className="cursor-pointer">Add Your First Experience</Button>
        </div>
      )}
    </div>
  );
}
