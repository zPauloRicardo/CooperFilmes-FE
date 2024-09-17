import { ServerResponse } from "http";
import { AuthService } from "./AuthService";
import { ScriptPage } from "../models";

export class ScriptService {
    private baseUrl: string;
    private authService: AuthService;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
        this.authService = new AuthService(this.baseUrl);
    }

    async searchScripts(customerEmail: string | undefined, stepId: Number | undefined, creationDate: string | undefined, page: Number): Promise<any> {



        try {

            const params = new URLSearchParams();

            if (customerEmail) {
                params.append("email", customerEmail);
            }

            if (creationDate) {
                const [year, month, day] = creationDate.split('-');
                const formattedDate = `${day}-${month}-${year}`;
                params.append("creationDate", formattedDate);
            }

            if (stepId) {
                params.append("stepId", stepId.toString());
            }

            params.append("page", page ? page.toString() : "0");

            const token = this.authService.getToken()

            const response = await fetch(`${this.baseUrl}/v1/script/?${params}`, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) return { error: "Ocorreu um erro interno" };

            const data: any = await response.json();

            if (response.status != 200) {
                const apiError: ServerResponse = data
                return apiError;
            }


            const mappedData: ScriptPage = {
                page: data.currentPage,
                pageSize: data.perPage,
                total: data.total,
                items: data.items.map((item: any) => ({
                    id: item.id,
                    customerEmail: item.customerOutput.email,
                    step: item.lastStep.type,
                    date: new Date(item.lastStep.stepDate)
                }))
            };
            return mappedData;
        } catch (error) {
            throw error;
        }


    }




}