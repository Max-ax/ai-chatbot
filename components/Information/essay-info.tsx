
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function GatherEssayInfo() {
  return (
    <Card className="max-w-2xl sm:max-w-xl">
      <CardHeader>
        <CardTitle>Application Essay</CardTitle>
        <CardDescription>Choose the type of essay and fill out the form below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <RadioGroup aria-label="Essay Type" className="flex items-center gap-4">
            <RadioGroupItem id="personal-statement" value="personal-statement" />
            <Label htmlFor="personal-statement">Personal Statement</Label>
            <RadioGroupItem id="program-essay" value="program-essay" />
            <Label htmlFor="program-essay">Program Essay</Label>
          </RadioGroup>
          <div className="grid gap-2">
            <Label htmlFor="program">Program</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="business-administration">Business Administration</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="nursing">Nursing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="motivation">Motivation</Label>
            <Textarea id="motivation" placeholder="Explain your motivation..." rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="education">Educational Experience</Label>
            <Textarea id="education" placeholder="Describe your educational background..." rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Experience</Label>
            <Textarea id="experience" placeholder="Highlight your relevant experience..." rows={3} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="personality">Personality</Label>
            <Textarea id="personality" placeholder="Tell us about your personality..." rows={3} />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button type="submit">Submit</Button>
      </CardFooter>
    </Card>
  )
}