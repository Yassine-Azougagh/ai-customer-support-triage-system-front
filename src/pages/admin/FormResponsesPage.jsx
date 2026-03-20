import { StatusComponent } from "@/components/StatusComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getTickets } from "@/services/ticket.service";
import { Check, Delete, MoreHorizontalIcon, Plus, View } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


const tableData = [
    {
        id: 1,
        title: "Analyse de satisfaction client Q4",
        createdAt: "2024-03-15T10:30:00Z",
        createdBy: "JD",
        formName: "Enquête Qualité",
        status: "PUBLISHED",
        answers: [
            {
                questionId: "q1",
                questionTitle: "Note globale",
                value: "4/5"
            },
            {
                questionId: "q2",
                questionTitle: "Commentaires",
                value: "Excellent service, très réactif."
            }
        ]
    },
    {
        id: 2,
        title: "Retour d'expérience Beta Test",
        createdAt: "2024-03-12T14:15:00Z",
        createdBy: "EM",
        formName: "Feedback Produit",
        status: "DRAFT",
        answers: [
            {
                questionId: "q1",
                questionTitle: "Bug rencontré",
                value: "Problème d'affichage sur mobile."
            }
        ]
    },
    {
        id: 3,
        title: "Inscription séminaire annuel",
        createdAt: "2024-03-10T09:00:00Z",
        createdBy: "AL",
        formName: "RH - Événements",
        status: "CLOSED",
        answers: [
            {
                questionId: "q1",
                questionTitle: "Régime alimentaire",
                value: "Végétarien"
            }
        ]
    },
    {
        id: 4,
        title: "Sondage matériel bureau",
        createdAt: "2024-03-08T16:45:00Z",
        createdBy: "KB",
        formName: "Logistique interne",
        status: "DELETED",
        answers: [
            {
                questionId: "q1",
                questionTitle: "Besoin",
                value: "Double écran 27 pouces"
            }
        ]
    }
];



export default function AdminResponsesPage() {
    const [responses, setResponses] = useState([]);
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [categoryFilter, setCategoryFilter] = useState("ALL");
    const [agentFilter, setAgentFilter] = useState("ALL");
    const navigate = useNavigate();

    useEffect(() => {
        setInterval(() => {
            getTickets().then(data => {
                const priorities = ["Low", "Medium", "Urgent"];
                const categories = ["Technical", "Billing", "General"];
                const agents = ["Alice", "Bob", "Unassigned"];
                const enriched = data.map((res, i) => ({
                    ...res,
                    priority: priorities[i % 3],
                    category: categories[i % 3],
                    agent: agents[i % 3],
                }));
                setResponses(enriched);
            });
        }, 60000);
    }, []);

    const filteredResponses = responses.filter(res => {
        if (statusFilter !== "ALL" && res.status !== statusFilter) return false;
        if (categoryFilter !== "ALL" && res.category !== categoryFilter) return false;
        if (agentFilter !== "ALL" && res.agent !== agentFilter) return false;
        return true;
    });

    return (
        <div>
            <header className="pb-5 flex justify-center items-center flex-col gap-2">
                <div className="text-5xl uppercase font-bold">Tickets Dashboard</div>
            </header>

            <div className="flex gap-4 mb-4 pl-[2.5rem]">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] bg-[#e2e2fc]">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Statuses</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="CLOSED">Closed</SelectItem>
                        <SelectItem value="DELETED">Deleted</SelectItem>
                        <SelectItem value="SUBMITTED">Submitted</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px] bg-[#e2e2fc]">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Categories</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Billing">Billing</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={agentFilter} onValueChange={setAgentFilter}>
                    <SelectTrigger className="w-[180px] bg-[#e2e2fc]">
                        <SelectValue placeholder="Filter by Agent" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All Agents</SelectItem>
                        <SelectItem value="Alice">Alice</SelectItem>
                        <SelectItem value="Bob">Bob</SelectItem>
                        <SelectItem value="Unassigned">Unassigned</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table className='bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-6xl'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Assigned Agent</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredResponses.map(response =>
                    (<TableRow key={response.id}>
                        <TableCell className="font-medium">{response.formTitle || response.title || 'Untitled'}</TableCell>
                        <TableCell>
                            <Badge variant={response.priority === 'Urgent' ? 'destructive' : response.priority === 'Low' ? 'secondary' : 'default'}
                                className={response.priority === 'Medium' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}>
                                {response.priority}
                            </Badge>
                        </TableCell>
                        <TableCell>{response.category}</TableCell>
                        <TableCell>{(response.createdAt || '').substring(0, 10)}</TableCell>
                        <TableCell>{response.agent}</TableCell>
                        <TableCell><StatusComponent status={response.status} /></TableCell>
                        <TableCell className="text-right">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="size-8">
                                        <MoreHorizontalIcon />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => navigate("/agent/tickets/" + response.id)}><View /> View</DropdownMenuItem>
                                    {response.status === 'SUBMITTED' && <DropdownMenuItem><Check /> Validate</DropdownMenuItem>}
                                    {response.status === 'DRAFT' &&
                                        <>
                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem variant="destructive">
                                                <Delete /> Delete
                                            </DropdownMenuItem>
                                        </>
                                    }
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>)
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
