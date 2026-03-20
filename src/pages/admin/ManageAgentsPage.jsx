import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Eye, MoreHorizontalIcon, Power, PowerOff, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { createAgent, updateAgent, getAllAgents, toggleAgentStatus, deleteAgent } from "@/services/agent.service";

export default function ManageAgentsPage() {
    const [agents, setAgents] = useState([]);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add'); // 'add', 'edit', 'view'
    const [currentAgent, setCurrentAgent] = useState({ username: '', email: '', role: 'Agent' });
    const [agentToDelete, setAgentToDelete] = useState(null);

    useEffect(() => {
        getAllAgents().then(data => {
            setAgents(data);
        });
    }, [])

    const openDialog = (mode, agent = null) => {
        setDialogMode(mode);
        if (agent) {
            setCurrentAgent({ ...agent });
        } else {
            setCurrentAgent({ name: '', email: '', role: 'Agent' });
        }
        setIsDialogOpen(true);
    };

    const handleSaveAgent = async () => {
        if (dialogMode === 'add') {
            const res = await createAgent(currentAgent)
            if (res) await getAllAgents().then(data => { setAgents(data); });
        } else if (dialogMode === 'edit') {
            const res = await updateAgent(currentAgent.id, currentAgent)
            if (res) setAgents(agents.map(a => a.id === currentAgent.id ? currentAgent : a));
        }
        setIsDialogOpen(false);
    };

    const toggleStatus = async (id) => {
        const res = await toggleAgentStatus(id);
        if (res) setAgents(agents.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
    };

    const confirmDelete = (agent) => {
        setAgentToDelete(agent);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteAgent = async () => {
        if (agentToDelete) {
            console.debug("filter", agents.filter(a => a.id !== agentToDelete.id))
            const res = await deleteAgent(agentToDelete.id);
            if (res) setAgents(agents.filter(a => a.id !== agentToDelete.id));
        }
        setIsDeleteDialogOpen(false);
        setAgentToDelete(null);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 w-full pb-10">
            <header className="pb-2 flex justify-between items-start gap-2 w-full pt-4">
                <div>
                    <div className="text-4xl font-bold">Manage Agents</div>
                    <div className="text-gray-500 mt-2">Add, remove, or modify agent accounts.</div>
                </div>
                <Button onClick={() => openDialog('add')}>Add New Agent</Button>
            </header>

            <div className="bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-full">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {agents.map(agent => (
                            <TableRow key={agent.id}>
                                <TableCell className="font-medium">{agent.username}</TableCell>
                                <TableCell>{agent.email}</TableCell>
                                <TableCell>{agent.role}</TableCell>
                                <TableCell>
                                    <Badge variant={agent.enabled ? 'default' : 'secondary'} className={agent.enabled ? 'bg-green-600 hover:bg-green-700' : ''}>
                                        {agent.enabled ? 'Enabled' : 'Disabled'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontalIcon />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => openDialog('view', agent)}>
                                                <Eye className="mr-2 size-4" /> View
                                            </DropdownMenuItem>

                                            {!agent.enabled && (
                                                <DropdownMenuItem onClick={() => openDialog('edit', agent)}>
                                                    <Edit className="mr-2 size-4" /> Edit
                                                </DropdownMenuItem>
                                            )}

                                            <DropdownMenuItem onClick={() => toggleStatus(agent.id)}>
                                                {agent.enabled ? (
                                                    <><PowerOff className="mr-2 size-4" /> Disable</>
                                                ) : (
                                                    <><Power className="mr-2 size-4" /> Enable</>
                                                )}
                                            </DropdownMenuItem>

                                            {!agent.enabled && (
                                                <DropdownMenuItem onClick={() => confirmDelete(agent)} variant="destructive" className="text-red-600">
                                                    <Trash2 className="mr-2 size-4" /> Delete
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {dialogMode === 'add' ? 'Add New Agent' : dialogMode === 'edit' ? 'Edit Agent' : 'Agent Details'}
                        </DialogTitle>
                        <DialogDescription>
                            {dialogMode === 'add' ? 'Enter the details of the new agent below.' : dialogMode === 'view' ? 'Reviewing agent information.' : 'Modify agent details. Agent is currently disabled.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" value={currentAgent.username} onChange={(e) => setCurrentAgent({ ...currentAgent, username: e.target.value })} className="col-span-3" disabled={dialogMode === 'view'} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" type="email" value={currentAgent.email} onChange={(e) => setCurrentAgent({ ...currentAgent, email: e.target.value })} className="col-span-3" disabled={dialogMode === 'view'} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">Role</Label>
                            <div className="col-span-3">
                                <Select value={currentAgent.role} onValueChange={(val) => setCurrentAgent({ ...currentAgent, role: val })} disabled={dialogMode === 'view'}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="AGENT">Agent</SelectItem>
                                        <SelectItem value="ADMIN">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    {dialogMode !== 'view' && (
                        <DialogFooter>
                            <Button type="button" onClick={handleSaveAgent}>Save changes</Button>
                        </DialogFooter>
                    )}
                </DialogContent>
            </Dialog>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the agent account for <strong>{agentToDelete?.name}</strong>.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAgent} className="bg-red-600 hover:bg-red-700">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
