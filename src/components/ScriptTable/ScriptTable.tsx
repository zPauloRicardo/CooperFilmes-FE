import { useEffect, useState } from "react";
import { DataGrid, GridAddIcon, GridCheckIcon, GridColDef, GridExpandMoreIcon, GridLoadIcon } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { ScriptService } from '../../services/ScriptService';
import Tooltip from '@mui/material/Tooltip';
import { ScriptRow } from "../../models";
import { Button, FormControl, Grid2, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AuthService } from "../../services/AuthService";

const scriptService = new ScriptService("http://localhost:8091");
const authService = new AuthService("http://localhost:8091");

const ETAPAS = [
    { key: '1', text: 'Aguardando Analise' },
    { key: '2', text: 'Em Analise' },
    { key: '3', text: 'Aguardando Revisão' },
    { key: '4', text: 'Em Revisão' },
    { key: '5', text: 'Aguardando Aprovação' },
    { key: '6', text: 'Em Aprovação' },
    { key: '7', text: 'Aprovado' },
    { key: '8', text: 'Recusado' },
];

const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        sortable: false,
    },
    {
        field: 'customerEmail',
        headerName: 'Email do Cliente',
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        sortable: false,
    },
    {
        field: 'step',
        headerName: 'Etapa',
        width: 300,
        minWidth: 300,
        maxWidth: 300,
    },
    {
        field: 'date',
        headerName: 'Data Envio',
        width: 150,
        minWidth: 150,
        maxWidth: 150,
        type: 'date',
    },
    {
        field: 'options',
        headerName: 'Opções',
        width: 300,
        minWidth: 300,
        maxWidth: 300,
        renderCell: (params) => {



            return (
                <div>
                    <Tooltip title="Ver Roteiro">
                        <IconButton>
                            <GridAddIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        },
        sortable: false, // Desativado para botões
    },
];

export default function ScriptTable() {
    const [rows, setRows] = useState<ScriptRow[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [emailFilter, setEmailFilter] = useState<string | null>(null);
    const [dateFilter, setDateFilter] = useState<string | null>(null);
    const [stepFilter, setStepFilter] = useState<string | null>(null);


    const load = async () => {
        try {

            const formattedDate = dateFilter ? dateFilter.replace(/\//g, '-') : undefined;



            const s = await scriptService.searchScripts(emailFilter ? emailFilter : undefined, stepFilter ? parseInt(stepFilter) : undefined, dateFilter ? formattedDate : undefined, 0);
            if (s.error || s.message) {
                setError(s.error || s.message);
                return;
            }
            console.warn(s)

            const mappedRows = s.items.map((item: any) => ({
                id: item.id,
                customerEmail: item.customerEmail,
                step: item.step,
                date: new Date(item.date),
            }));
            console.warn(s)
            setRows(mappedRows);
            setPaginationModel({ page: s.page, pageSize: s.pageSize });
        } catch (err) {
            console.warn(err)
            setError("Erro ao carregar dados.");
        }
    };



    useEffect(() => {
        load();  // Load initial data
    }, []);

    return (
        <>
            <div style={{ padding: '16px' }}>
                <Grid2 container spacing={2} alignItems="center">
                    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
                        <TextField
                            label="Filtro de Email"
                            variant="outlined"
                            fullWidth
                            value={emailFilter}
                            onChange={(e) => setEmailFilter(e.target.value)}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
                        <FormControl fullWidth>
                            <TextField
                                label="Filtro de Data"
                                type="date"
                                variant="outlined"
                                value={dateFilter || ''}
                                onChange={(e) => setDateFilter(e.target.value)}
                                slotProps={{
                                    inputLabel: {
                                        shrink: true,
                                    },
                                }}
                            />
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" shrink>Etapa</InputLabel>
                            <Select
                                label="Etapa"
                                value={stepFilter || ''}
                                onChange={(e) => setStepFilter(e.target.value)}
                                displayEmpty
                            >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {ETAPAS.map((etapa) => (
                                    <MenuItem key={etapa.key} value={etapa.key}>
                                        {etapa.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4, md: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={load}
                        >
                            Buscar
                        </Button>
                    </Grid2>
                </Grid2>
            </div>
            <Paper sx={{ height: 400, maxWidth: '100%' }}>
                {error ? (
                    <div>{error}</div>
                ) : (
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={rows.length}
                        paginationMode="server" // Para indicar que a paginação é controlada pelo servidor
                        paginationModel={paginationModel}
                        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
                        sx={{ border: 0 }}
                        disableColumnMenu // Desabilita o menu da coluna
                        disableColumnSorting
                        disableColumnResize
                    />
                )}
            </Paper>
        </>
    );
}
