import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default class UserDAO {

    async checkRelations(data) {

        try {
            let result = await prisma.$queryRaw`WITH 
                    company_result AS (
                        SELECT id, \"name\" FROM companies WHERE id = ${data.id_companies}
                    ),
                    role_result AS (
                        SELECT id, \"name\" FROM roles WHERE id = ${data.id_roles}
                    )
                SELECT 
                    company_result.id as id_companies, company_result.name as company_name, role_result.id as id_roles, role_result.name as role_name
                FROM 
                    company_result, role_result
                WHERE
                    company_result.id IS NOT NULL AND role_result.id IS NOT NULL
                UNION ALL
                SELECT 
                    NULL, NULL, NULL, NULL
                WHERE 
                    NOT EXISTS (SELECT 1 FROM company_result) 
                    OR NOT EXISTS (SELECT 1 FROM role_result);`;

            if (!result[0] || !result[0].id_companies || !result[0].id_roles) {
                return { success: false };
            };

            return { success: true, message: result[0] };
        } catch (error) {
            return { success: false, message: error.message };
        }

    }

    async create(data) {
        try {
            const result = await prisma.$transaction(async (prisma) => {
                const user = await prisma.users.create({
                    data: {
                        name: data.name,
                        email: data.email,
                        password: data.password,
                    }
                });
            
                const relations = await prisma.users_companies.create({
                    data: {
                        id_users: user.id,
                        id_companies: data.id_companies,
                        id_roles: data.id_roles,
                    }
                });
            
                return { user, relations };
            });
            
            if (!result.user || !result.relations) {
                return { success: false, message: 'Error creating user' };
            }
            
            return { success: true, result: result };
        } catch (error) {
            return { success: false, message: error.message };
        }
    }

}