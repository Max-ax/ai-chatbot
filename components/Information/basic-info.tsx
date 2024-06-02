
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function GatherBasicInfo() {
  return (
    <form className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Information</CardTitle>
          <CardDescription>Fill out the form below to provide your basic information.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="school-name">School Name</Label>
            <Input id="school-name" placeholder="Enter your school name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-tier">School Tier</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select school tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tier1">Tier 1</SelectItem>
                <SelectItem value="tier2">Tier 2</SelectItem>
                <SelectItem value="tier3">Tier 3</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Undergraduate Major</Label>
            <Input id="major" placeholder="Enter your undergraduate major" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="toefl-score">TOEFL Score</Label>
            <Input id="toefl-score" placeholder="Enter your TOEFL score" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gre-score">GRE Score</Label>
            <Input id="gre-score" placeholder="Enter your GRE score" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input id="age" placeholder="Enter your age" type="number" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gpa">Undergraduate GPA</Label>
            <Input id="gpa" placeholder="Enter your undergraduate GPA" step="0.1" type="number" />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Textarea className="min-h-[180px]" id="experience" placeholder="Enter your experience" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}