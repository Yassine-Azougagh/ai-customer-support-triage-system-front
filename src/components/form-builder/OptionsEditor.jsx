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
    TableRow
} from "@/components/ui/table";
import { Delete, MoreHorizontalIcon } from "lucide-react";
import {
    Button
} from "/src/components/ui/button";
import {
    Input
} from "/src/components/ui/input";
export default function OptionsEditor({ form, index }) {

    const addOption = () => {
        form.setFieldValue(`schemas[${index}].options`, old => [...old, { title: '', value: '' }])
    };
    return (
        <div className="mt-3 border-t pt-3">
            <form.Field key={`option-${index}`} name={`schemas[${index}].options`} mode="array">
                {(field) => {
                    return (
                        <>
                            {/* Header */}
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-lg">
                                    Options
                                </h3>
                                <button
                                    onClick={addOption}
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
                                    {field.state.value.length > 0 ?
                                        field.state.value.map((_, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell>
                                                        <form.Field key={i} name={`schemas[${index}].options[${i}].title`}>
                                                            {(subField) => {
                                                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                return (
                                                                    <Input
                                                                        id={subField.name}
                                                                        name={subField.name}
                                                                        type='text'
                                                                        value={subField.state.value}
                                                                        onBlur={subField.handleBlur}
                                                                        onChange={(e) => subField.handleChange(e.target.value)}
                                                                        aria-invalid={isInvalid}
                                                                        autoComplete="off"
                                                                    />
                                                                )
                                                            }}
                                                        </form.Field>
                                                    </TableCell>
                                                    <TableCell>
                                                        <form.Field key={i} name={`schemas[${index}].options[${i}].value`}>
                                                            {(subField) => {
                                                                const isInvalid = subField.state.meta.isTouched && !subField.state.meta.isValid
                                                                return (
                                                                    <Input
                                                                        id={subField.name}
                                                                        name={subField.name}
                                                                        type='text'
                                                                        value={subField.state.value}
                                                                        onBlur={subField.handleBlur}
                                                                        onChange={(e) => subField.handleChange(e.target.value)}
                                                                        aria-invalid={isInvalid}
                                                                        autoComplete="off"
                                                                    />
                                                                )
                                                            }}
                                                        </form.Field>
                                                    </TableCell>
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
                                                                    onClick={() => field.removeValue(i)}
                                                                    variant="destructive"
                                                                >
                                                                    <Delete /> Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        }) :
                                        (
                                            <div>No option is specified</div>
                                        )

                                    }
                                </TableBody>
                            </Table>
                        </>

                    )
                }}
            </form.Field>
        </div>
    );
}
