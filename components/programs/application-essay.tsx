
import { CardTitle, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface Essay {
    id:number;
  }

  
export function ApplicationEssay({ props: essay }: { props: Essay }) {
  return (
    <Card key="1" className="w-full max-w-xl">
      <CardHeader className="bg-gray-100 px-9 py-3 rounded-t">
        <CardTitle className="text-lg font-medium">Application Essay</CardTitle>
      </CardHeader>
      <CardContent className="my-4 max-h-[600px] overflow-auto px-6">
        <Textarea
          className="w-full resize-none border-transparent"
          defaultValue={`College Application Essay"${essay.id}"
As I stand on the threshold of adulthood, preparing to take my first steps into the world of higher education, I am filled with both excitement and trepidation. My journey so far has been a mosaic of experiences, challenges, and triumphs that have shaped who I am today and who I aspire to become. In this essay, I hope to convey my passion for learning, my commitment to personal growth, and my readiness to contribute to the vibrant community at your esteemed institution.
From a young age, I have been driven by an insatiable curiosity and a deep-seated love for knowledge. My parents often recount stories of my incessant questions about the world around me, and my early fascination with books and science kits. This curiosity blossomed into a passion for problem-solving and innovation, leading me to participate in various science fairs and competitions throughout my school years.
One of my proudest moments was winning first place at the regional science fair with a project on renewable energy sources. This experience not only reinforced my love for science but also ignited a desire to make a positive impact on the world.
In high school, I embraced every opportunity to broaden my horizons and challenge myself academically. I enrolled in Advanced Placement (AP) courses in subjects ranging from mathematics and physics to literature and history. The rigorous curriculum pushed me to develop critical thinking skills, time management, and perseverance. My efforts were rewarded with high scores on my AP exams, but more importantly, I acquired lifelong skills.
As I look towards the future, I am eager to continue my intellectual journey at your university. I am drawn to the diverse course offerings, the renowned faculty, and the vibrant campus life. I believe that the opportunities for research, internships, and extracurricular involvement will allow me to further develop my skills and make meaningful contributions to the community.
Beyond the academic realm, I am passionate about giving back to my community. Throughout high school, I volunteered at a local food bank, tutored underprivileged children, and organized fundraisers for various charitable organizations. These experiences have instilled in me a deep sense of empathy and a desire to use my talents to make a positive difference in the world.
In conclusion, I am confident that my academic achievements, my thirst for knowledge, and my commitment to service make me an ideal candidate for your university. I am eager to embark on this next chapter of my life and to become an active member of your vibrant community. Thank you for considering my application, and I look forward to the opportunity to further discuss my qualifications and aspirations.
`}
          rows={20}
          style={{
            width: "100%",
          }}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Edit It !</Button>
      </CardFooter>
    </Card>
  )
}