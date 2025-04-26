import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllUserErrors, logout } from '@/store/slices/userSlice';
import { getMyProjects } from '@/store/slices/projectSlice'; // Import getMyProjects
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

import { Blocks, CircleUser, FolderGit, History, Home, LayoutGrid, LogOut, Mail, MessageSquare, Moon, Package, Package2, PanelLeft, PencilRuler, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import Dashboard from './sub-components/Dashboard';
import Addproject from './sub-components/AddProject';
import AddSkills from './sub-components/AddSkills';
import AddTimeline from './sub-components/AddTimeline';
import Messages from './sub-components/Messages';
import Account from './sub-components/Account';
import AddApplication from './sub-components/AddApplication';
import { getAllTimeline } from '@/store/slices/timelineSlice';
import SendNewsletterPage from './sub-components/SendNewsletterPage';

const HomePage = () => {
    const [active, setActive] = useState("Dashboard");
    const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("theme") === "dark");
    const { isAuthenticated, error, user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Logged Out");
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearAllUserErrors());
        }
        if (!isAuthenticated) {
            navigateTo("/login");
        }
    }, [isAuthenticated, error, dispatch, navigateTo]);

    useEffect(() => {
        dispatch(getMyProjects()); // Fetch projects data
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllTimeline()); // Fetch projects data
    }, [dispatch]);

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
          root.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          root.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [isDarkMode]);
    
      const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
      };
    
    return (
        <>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Link className="group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full">
                        <Package  className="h-6 w-6 transition-all group-hover:scale-110" />                       
                        <span className="sr-only">Dashboard</span>
                        </Link>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link 
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                        active === "Dashboard"
                                        ? "text-accent-foreground bg-accent"
                                        : "text-muted-foreground"
                                    } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                    onClick={() => setActive("Dashboard")}
                                    >
                                        <Home  className="w-5 h-5" />
                                        <span className="sr-only">Dashboard</span>
                                    </Link>
                                    
                                </TooltipTrigger>
                                <TooltipContent side="right">Dashboard</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Add Project"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={() => setActive("Add Project")}
                                
                                >
                                    <FolderGit  className="w-5 h-5" />
                                    <span className="sr-only">Add Project</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Add Project</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Add Skills"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={() => setActive("Add Skills")}
                                
                                >
                                    <PencilRuler  className="w-5 h-5" />
                                    <span className="sr-only">Add Skills</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Add Skills</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Add Application"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={() => setActive("Add Application")}
                                
                                >
                                    <LayoutGrid  className="w-5 h-5" />
                                    <span className="sr-only">Add Application</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Add Application</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Add Timeline"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                onClick={() => setActive("Add Timeline")}
                            >
                                <History className="w-5 h-5" />
                                <span className="sr-only">Add Timeline</span>
                            </Link>
                            
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Add Timeline</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Messages"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={() => setActive("Messages")}
                                
                                >
                                    <MessageSquare   className="w-5 h-5" />
                                    <span className="sr-only">Messages</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Messages</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link className={`flex h-9 w-9 items-center justify-center rounded-lg ${active === "Send Newsletter" ? "text-accent-foreground bg-accent" : "text-muted-foreground"}`} onClick={() => setActive("Send Newsletter")}>
                                    <Mail className="w-5 h-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Send Newsletter</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Account"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={() => setActive("Account")}
                                
                                >
                                    <CircleUser className="w-5 h-5" />
                                    <span className="sr-only">Account</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Account</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    </nav>
                    <nav className="mt-auto flex-col items-center gap-4 px-2 py-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link 
                                className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                                    active === "Logout"
                                    ? "text-accent-foreground bg-accent"
                                    : "text-muted-foreground"
                                } transition-colors hover: text-foreground md:h-8 md:w-8`}
                                 onClick={handleLogout}
                                
                                >
                                    <LogOut  className="w-5 h-5" />
                                    <span className="sr-only">Logout</span>
                                </Link>
                                
                            </TooltipTrigger>
                            <TooltipContent side="right">Logout</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    </nav>
                    
                </aside>




                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-r bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px] ">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" valriant="outline" className="sm:hidden">
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Blocks className="h-5 w-5" />
                                 <span style={{ color: 'black', fontFamily: 'Tahoma, sans-serif', marginLeft: '5px' }}>
                                    Menu
                             </span>   
                             </div>


                                
                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Dashboard" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Dashboard")}
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
  



                               <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Add Project" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Add Project")}
                                >
                                    <FolderGit className="h-5 w-5" />
                                    Add Project
                                </Link>



                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Add Skills" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Add Skills")}
                                >
                                    <PencilRuler className="h-5 w-5" />
                                    Add Skills
                                </Link>



                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Add Application" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Add Application")}
                                >
                                    <LayoutGrid className="h-5 w-5" />
                                    Add Application
                                </Link>



                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Add Timeline" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Add Timeline")}
                                >
                                    <History className="h-5 w-5" />
                                    Add Timeline
                                </Link>


                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Message" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Messages")}
                                >
                                    <MessageSquare className="h-5 w-5" />
                                    Messages
                                </Link>

                                <Link 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Send Newsletter" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`} 
                                    onClick={() => setActive("Send Newsletter")}
                                >
                                    <Mail className="h-5 w-5" /> Send Newsletter
                                </Link>




                                <Link 
                                    href="#" 
                                    className={`flex items-center gap-4 px-2.5 ${active === "Account" 
                                    ? "text-foreground" 
                                    : "text-muted-foreground hover:text-foreground"}`}
                                    onClick={() => setActive("Account")}
                                >
                                    <CircleUser  className="h-5 w-5" />
                                    Account
                                </Link>



                                <Link 
                                    className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                                    onClick={handleLogout}
                                    >
                                        <LogOut className="h-5 w-5"/>
                                    </Link>


                            </nav>

                        </SheetContent>
                    </Sheet>

                    <div className="flex items-center gap-4 md: grow-0 sm: ml-16 sm: mt-5">

                    <img 
                      src={user && user.avatar && user.avatar.url} 
                      alt="Avatar" 
                      className="w-20 h-20 rounded-full object-cover max-[900px]:hidden"
                    />


                        <h1 className="text-4xl max-[900px]:text-1xl">
                            Wellcome Back {user.fullName}
                        </h1>
                    </div>



                    <div className="flex items-center gap-4 ml-auto">
                        {/* Dark Mode Toggle */}
                    <Button onClick={toggleDarkMode} className="p-2 rounded-full">
                                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </Button>
                       </div>

                </header>


                {
                    (()=>{
                        switch (active) {
                            case "Dashboard":
                                return <Dashboard/>;
                                break;
                            case "Add Project":
                                return <Addproject/>;
                                break;
                           case "Add Skills":
                                return <AddSkills/>;
                                break;
                            case "Add Application":
                                return <AddApplication/>;
                                break;
                            case "Add Timeline":
                                return <AddTimeline/>;
                                break;
                            case "Messages":
                                return <Messages/>;
                                break;
                            case "Send Newsletter":
                                return <SendNewsletterPage />;
                                break;
                            case "Account":
                                return <Account/>;
                                break;
                        
                            default:
                                return  <Dashboard/>;
                                break;
                                
                        }

                    })()}
                


            </div>
        </>
    );
};

export default HomePage;