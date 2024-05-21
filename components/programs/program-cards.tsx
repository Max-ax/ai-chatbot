'use client'

import { useActions, useUIState } from 'ai/rsc'
import { useState, useMemo } from 'react';
import type { AI } from '@/lib/chat/actions'
import { AvatarImage, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import harvardLogo from './Harvard.png';
import { ProgramCard } from './program-card';

interface Program {
  id:number;
}

export function ProgramCards({ props: programs }: { props: Program[] }) {
 


  return (
  <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm sm:grid sm:grid-cols-2">

        {programs.map((program) => ( 
          <ProgramCard props={program} />
        ))}
    </div>
  )
}








