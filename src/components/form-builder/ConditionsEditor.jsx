import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Delete, MoreHorizontalIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Field,
    FieldError
} from "/src/components/ui/field";
import {
    Input
} from "/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectSeparator,
    SelectTrigger,
    SelectValue
} from "/src/components/ui/select";
const CONDITIONS = [
    {
        id: 1,
        title: 'Required',
        name: 'conditions.required',
        type: 'select',
        options: [
            {label: 'True', value: true},
            {label: 'False', value: false}
        ]
    },
    {
        id: 2,
        title: 'Minimum Length',
        name: 'conditions.minLength',
        type: 'number',
    },
    {
        id: 3,
        title: 'Maximum Length',
        name: 'conditions.maxLength',
        type: 'number',
    },
]
export default function ConditionsEditor({ form, index }) {

    const [conditionsTable, setConditionsTable] = useState([]);

    useEffect(()=>{
        if(conditionsTable.length === 0)
            setConditionsTable(CONDITIONS)
    }, [])

    const removeCondition = (condition) => {
        setConditionsTable([...conditionsTable.filter(c => c.id != condition.id)]);
    }
    const addCondition = ()=>{
         setConditionsTable(CONDITIONS)
    }
    return (
        <div className="mt-3 border-t pt-3">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">
                    Conditions
                </h3>
                <button
                    onClick={addCondition}
                    className="text-grey-500 hover:text-black-700"
                    type="button"
                >
                    Add
                </button>
            </div>

            <Table className='bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        conditionsTable && conditionsTable.length > 0 ?
                         conditionsTable.map((condition) => (
                            (<TableRow key={condition.id}>
                                <TableCell className="font-medium">{condition.title}</TableCell>
                                <TableCell>{
                                    <form.Field
                                        name={`schemas[${index}].${condition.name}`}
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched && !field.state.meta.isValid
                                            return (
                                                <Field data-invalid={isInvalid}>
                                                    {
                                                        condition.type === 'select' ?
                                                            (<Select
                                                                name={field.name}
                                                                value={field.state.value}
                                                                onValueChange={(e) => field.handleChange(String(e) === 'true')}
                                                            >
                                                                <SelectTrigger
                                                                    id="form-tanstack-select-language"
                                                                    aria-invalid={isInvalid}
                                                                    className="min-w-[120px]"
                                                                >
                                                                    <SelectValue  />
                                                                </SelectTrigger>
                                                                <SelectContent position="item-aligned">
                                                                    <SelectSeparator />
                                                                    {condition.options.map((option) => (
                                                                        <SelectItem
                                                                            key={option.label}
                                                                            value={option.value}
                                                                        >
                                                                            {option.label}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>) : 
                                                            condition.type === 'number' ?
                                                            (
                                                                <Input
                                                                    id={field.name}
                                                                    name={field.name}
                                                                    type={condition.type}
                                                                    value={field.state.value}
                                                                    onBlur={field.handleBlur}
                                                                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                                                                    aria-invalid={isInvalid}
                                                                    autoComplete="off"
                                                                />
                                                            ):
                                                            (
                                                                <></>
                                                            )
                                                    }

                                                    {isInvalid && (
                                                        <FieldError errors={field.state.meta.errors} />
                                                    )}
                                                </Field>
                                            )
                                        }}
                                    />
                                }</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="size-8">
                                                <MoreHorizontalIcon />
                                                <span className="sr-only">Open menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem 
                                                onClick={() => removeCondition(condition)}
                                                variant="destructive"
                                            >
                                                <Delete /> Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>)
                        )):
                        <div>No condition is specified</div>
                    }
                </TableBody>
            </Table>
        </div>
    );
}
