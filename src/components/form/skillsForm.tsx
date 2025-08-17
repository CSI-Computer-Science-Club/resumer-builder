'use client'

import { useState } from 'react';
import { SkillCategory, Skill } from '@/types/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface SkillsFormProps {
  data: SkillCategory[];
  onUpdate: (data: SkillCategory[]) => void;
}

export default function SkillsForm({ data, onUpdate }: SkillsFormProps) {
    const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(data);

    const addCategory = () => {
        const newCategory: SkillCategory = {
            id: `category-${Date.now()}`,
            title: '',
            skills: []
        }
        const updated = [...skillCategories, newCategory];
        setSkillCategories(updated);
        onUpdate(updated);
    }

    const removeCategory = (categoryId: string) => {
        const updated = skillCategories.filter(cat => cat.id !== categoryId);
        setSkillCategories(updated);
        onUpdate(updated);
    };

    const updateCategoryTitle = (categoryId: string, title: string) => {
        const updated = skillCategories.map(cat => 
            cat.id === categoryId ? {...cat, title} : cat
        )
        setSkillCategories(updated);
        onUpdate(updated);
    }

    const addSkill = (categoryId: string) => {
        const newSkill: Skill = {
            id: `${categoryId}-skill-${Date.now()}`,
            name: ''
        };
        const updated = skillCategories.map(cat => 
            cat.id === categoryId ? {...cat, skills: [...(cat.skills || []), newSkill]} : cat
        )
        setSkillCategories(updated)
        onUpdate(updated);
    }

    const updateSkill = (categoryId: string, skillId: string, field: keyof Skill, value: string) => {
        const updated = skillCategories.map(cat =>
            cat.id === categoryId
                ? {
                    ...cat,
                    skills: cat.skills?.map(skill =>
                    skill.id === skillId
                        ? { ...skill, [field]: value || undefined }
                        : skill
                    )
                }
                : cat
            );
        setSkillCategories(updated);
        onUpdate(updated);
    };

    const removeSkill = (categoryId: string, skillId: string) => {
        const updated = skillCategories.map(cat =>
        cat.id === categoryId
            ? { ...cat, skills: cat.skills?.filter(skill => skill.id !== skillId) }
            : cat
        );
        setSkillCategories(updated);
        onUpdate(updated);
    };


    return (
        <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
            <p className="text-gray-600">Organize your skills into categories</p>
            </div>
            <Button onClick={addCategory}>Add Category</Button>
        </div>

        {skillCategories.map((category) => (
            <Card key={category.id}>
            <CardHeader>
                <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                    <Input
                    value={category.title}
                    onChange={(e) => updateCategoryTitle(category.id, e.target.value)}
                    placeholder="Category name (e.g., Programming Languages)"
                    className="text-lg font-medium"
                    />
                </div>
                <Button
                    variant="remove"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                >
                </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {category.skills?.map((skill) => (
                <div key={skill.id} className="grid grid-cols-12 gap-2 items-end">
                    <div className="col-span-10">
                    <Input
                        label={category.skills?.indexOf(skill) === 0 ? "Skill Name" : ""}
                        value={skill.name}
                        onChange={(e) => updateSkill(category.id, skill.id, 'name', e.target.value)}
                        placeholder="Python"
                    />
                    </div>
                    <div className="col-span-2">
                    <Button
                        variant="remove"
                        size="md"
                        onClick={() => removeSkill(category.id, skill.id)}
                    >
                    </Button>
                    </div>
                </div>
                ))}
                <Button
                variant="add"
                onClick={() => addSkill(category.id)}
                >
                Add Skill
                </Button>
            </CardContent>
            </Card>
        ))}

        {skillCategories.length === 0 && (
            <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No skill categories yet</p>
            <Button onClick={addCategory}>Add Your First Category</Button>
            </div>
        )}
        </div>
    )
}