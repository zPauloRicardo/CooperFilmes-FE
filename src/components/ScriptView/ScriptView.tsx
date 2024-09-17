import React from 'react';
import { CheckCircle as CheckCircleIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Paper, Box, Typography, TextField, List, ListItem, ListItemText, Divider, LinearProgress, Grid } from '@mui/material';

interface User {
    id: string;
    name: string;
}

interface Step {
    type: string;
    justification: string | undefined;
    userOutput: User | undefined;
    stepDate: string;
}

interface Vote {
    type: string;
    user: User;
    voteDate: string;
}

interface CustomerOutput {
    name: string;
    email: string;
    phone: string;
}

interface DataObject {
    id: string;
    text: string;
    customerOutput: CustomerOutput;
    lastStep: Step;
    steps: Step[];
    votes: Vote[];
}

const data: DataObject = {
    id: "884e1a40-9d34-446a-b4ab-a5ed5de1b832",
    text: "Um roteiro de teste",
    customerOutput: {
        name: "Paulo Jr",
        email: "eu@paulojr.me",
        phone: "51998999999"
    },
    lastStep: {
        type: "Aguardando Analise",
        justification: undefined,
        userOutput: undefined,
        stepDate: "2024-09-16T23:34:22"
    },
    steps: [
        {
            type: "Aguardando Analise",
            justification: undefined,
            userOutput: undefined,
            stepDate: "2024-09-16T23:34:22"
        }
    ],
    votes: []
};

const ProgressBar = ({ value }: { value: number }) => (
    <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress variant="determinate" value={value} />
    </Box>
);

export default function ScriptView() {
    const { id, customerOutput, lastStep, steps, votes } = data;

    const totalVotes = 3; 
    const completedVotes = votes.length;
    const progress = (completedVotes / totalVotes) * 100;

    return (
        <Paper sx={{ padding: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Detalhes - #{id}</Typography>

            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        value={customerOutput.name}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={customerOutput.email}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Telefone"
                        variant="outlined"
                        fullWidth
                        value={customerOutput.phone}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
            </Grid>

            <Typography variant="h6">Histórico de Etapas</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6} style={{ overflowX: 'auto' }}>
                    <List>
                        {steps.map((step, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={
                                        <Typography variant="body1">
                                            {step.type}
                                        </Typography>
                                    }
                                    secondary={
                                        <Box>
                                            {step.justification && (
                                                <Typography variant="body2">
                                                  UMA JUSTIFICATIVA
                                                </Typography>
                                            )}
                                            <Typography variant="body2">
                                                {step.userOutput ? `Responsável: ${step.userOutput.name}` : "Responsável: Sistema"} - Data: {new Date(step.stepDate).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>

                <Grid item xs={6} style={{ overflowX: 'auto' }}>
                    <List>
                        {votes.map((vote, index) => (
                            <ListItem
                                key={index}
                                style={{
                                    backgroundColor: vote.type === 'Aprovado' ? 'lightgreen' : 'lightcoral',
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="body1">
                                            Voto: {vote.type}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="body2">
                                            Responsável: {vote.user.name} - Data: {new Date(vote.voteDate).toLocaleDateString()}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

            <Typography variant="h6">Progresso dos Votos</Typography>
            <ProgressBar value={progress} />
        </Paper >
    );
}
