import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { clearAllSkillErrors } from "@/store/slices/skillSlice";
import {
  clearAllSoftwareAppErrors,
  deleteSoftwareApplication,
  getAllSoftwareApplications,
  resetSoftwareApplicationSlice,
} from "@/store/slices/softwareApplication.Slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { clearAllTimelineErrors, getAllTimeline } from "@/store/slices/timelineSlice";
import { clearAllProjectErrors } from "@/store/slices/projectSlice";

const Dashboard = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  
  // Navigation handlers
  const gotoMangeSkills = () => navigateTo("/manage/skills");
  const gotoMangeTimeline = () => navigateTo("/manage/timeline");
  const gotoMangeProjects = () => navigateTo("/manage/projects");
  const gotoAddTimeline = () => navigateTo("/addtimeline");

  // State and selectors
  const { user } = useSelector((state) => state.user);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
  } = useSelector((state) => state.skill);
  const {
    softwareApplications,
    loading: appLoading,
    error: appError,
    message: appMessage,
  } = useSelector((state) => state.softwareApplications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
    message: timelineMessage,
  } = useSelector((state) => state.timeline);
  const { projects, error: projectError } = useSelector(
    (state) => state.project
  );

  // Local state for app ID
  const [appId, setAppId] = useState(null);

  // Delete Software Application handler
  const handleDeleteSoftwareApp = (id) => {
    setAppId(id);
    dispatch(deleteSoftwareApplication(id));
  };

  // useEffect for handling errors and messages
  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (appError) {
      toast.error(appError);
      dispatch(clearAllSoftwareAppErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setAppId(null);
      dispatch(resetSoftwareApplicationSlice());
      dispatch(getAllSoftwareApplications());
    }
  
    if (timelineError) {
      toast.error(timelineError);
      dispatch(getAllTimeline());
 
    }
  }, [
    dispatch,
    skillError,
    appError,
    appMessage,
    timelineError,
    timelineLoading,
    timelineMessage,
  ]);

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* User description */}
            <Card className="sm:col-span-2">
              <CardHeader className="pb-3">
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {user.aboutMe}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>Visit Portfolio</Button>
              </CardFooter>
            </Card>

            {/* Projects */}
            <Card className="flex flex-col justify-center">
                <CardHeader className="pb-2">
                  <CardTitle>Projects Completed</CardTitle>
                  <CardTitle className="text-6xl">{Array.isArray(projects) ? projects.length : 0}</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button onClick={gotoMangeProjects}>Manage Projects</Button>
                </CardFooter>
              </Card>

            {/* Skills */}
            <Card className="flex flex-col justify-center">
              <CardHeader className="pb-2">
                <CardTitle>Skills</CardTitle>
                <CardTitle className="text-6xl">{skills && skills.length}</CardTitle>
              </CardHeader>
              <CardFooter>
                <Button onClick={gotoMangeSkills}>Manage Skills</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Tabs: Projects, Skills, Software Applications, Timeline */}
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead className="hidden md:table-cell">Stack</TableHead>
                        <TableHead className="hidden md:table-cell">Deployed</TableHead>
                        <TableHead className="md:table-cell">Update</TableHead>
                        <TableHead className="text-right">Visit</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects && projects.length > 0 ? (
                        projects.map((element) => (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell>
                              <div className="font-medium">{element.title}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{element.stack}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge className="text-xs" variant="secondary">{element.deployed}</Badge>
                            </TableCell>
                            <TableCell className="md:table-cell">
                              <Link to={`/update/project/${element._id}`}>
                                <Button>Update</Button>
                              </Link>
                            </TableCell>
                            <TableCell className="text-right">
                              <Link to={`/view/project/${element._id}`} target="_blank">
                                <Button>Visit</Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            No projects found. <Button onClick={gotoMangeProjects}>Add Project</Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Skills */}
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                  {skills && skills.length > 0 ? (
                    skills.map((element) => (
                      <Card key={element._id}>
                        <CardHeader>{element.title}</CardHeader>
                        <CardFooter>
                          <Progress value={element.proficiency} />
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <p className="text-3xl">You have not added any skill.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Software Applications & Timeline */}
          <Tabs>
            <TabsContent className="grid min-[1050px]:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Software Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="md:table-cell">Icon</TableHead>
                        <TableHead className="md:table-cell text-center">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {softwareApplications && softwareApplications.length > 0 ? (
                        softwareApplications.map((element) => (
                          <TableRow className="bg-accent" key={element._id}>
                            <TableCell className="font-medium">{element.name}</TableCell>
                            <TableCell className="md:table-cell">
                              <img className="w-7 h-7" src={element.svg?.url} alt={element.name} />
                            </TableCell>
                            <TableCell className="md:table-cell text-center">
                              {appLoading && appId === element._id ? (
                                <SpecialLoadingButton content={"Deleting"} width={"100px"} />
                              ) : (
                                <Button
                                  className="bg-red-500"
                                  onClick={() => handleDeleteSoftwareApp(element._id)}
                                >
                                  Delete
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell className="text-3xl overflow-y-hidden">
                            No applications found.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card>
                <CardHeader className="px-7">
                  <CardTitle>Timeline</CardTitle>
                  <Button onClick={gotoMangeTimeline} className="w-fit">
                      Manage Timeline
                    </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {Array.isArray(timeline) && timeline.length > 0 ? (
  timeline.map((element) => (
    <TableRow className="bg-accent" key={element._id}>
      <TableCell className="font-medium">
        {element.timeline?.from || "N/A"} - {element.timeline?.to || "Present"}
      </TableCell>
      <TableCell>{element.title}</TableCell>
    </TableRow>
  ))
) : (
  <TableRow>
    <TableCell colSpan="2" className="text-3xl text-center">
      No timeline records found.
      <Button onClick={gotoAddTimeline}>Add Timeline</Button>
    </TableCell>
  </TableRow>
)}

                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;









