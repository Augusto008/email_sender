import { Router } from 'express';
import companyController from './controller/companyController';

const route = Router();

// route.post('/session', sessionController.login);

// route.post('/sender/:domain/:template', emailController.sendSelected);

// route.post('/user/:company/:role', userController.createUser);
// route.get('/users', userController.allUsers);
// route.get('/user/:id', userController.findUser);
// route.put('/user/:id', userController.updateUser);
// route.delete('/user/:id', userController.deleteUser);
// route.delete('/destroy_user/:id', userController.destroyUser);

// route.post('/role', roleController.createRole);
// route.get('/roles', roleController.allRoles);
// route.get('/role/:id', roleController.findRole);
// route.put('/role/:id', roleController.updateRole);
// route.delete('/role/:id', roleController.deleteRole);
// route.delete('/destroy_role/:id', roleController.destroyRole);

route.post('/company', companyController.createCompany);
route.get('/companies', companyController.allCompanies);
// route.get('/company/:id', companyController.findCompany);
// route.put('/company/:id', companyController.updateCompany);
// route.delete('/company/:id', companyController.deleteCompany);
// route.delete('/destroy_company/:id', companyController.destroyCompany);

// route.post('/domain', domainController.createDomain);
// route.get('/domains', domainController.allDomains);
// route.get('/domain/:id', domainController.findDomain);
// route.put('/domain/:id', domainController.updateDomain);
// route.delete('/domain/:id', domainController.deleteDomain);
// route.delete('/destroy_domain/:id', domainController.destroyDomain);

// route.post('/template', templateController.createTemplate);
// route.get('/templates', templateController.allTemplates);
// route.get('/template/:id', templateController.findTemplate);
// route.put('/template/:id', templateController.updateTemplate);
// route.delete('/template/:id', templateController.deleteTemplate);
// route.delete('/destroy_template/:id', templateController.destroyTemplate);

// route.post('/sender/:domain/:template', emailController.newJob);
// route.get('/queues', emailController.allQueues);
// route.get('/queue/:status', emailController.findQueue);
// route.get('/jobs/:filter/:value', emailController.findJobs);
// route.put('/queue/:status', emailController.queueReview);
// route.put('/jobs/:status', emailController.jobsReview);
// route.delete('/queue/:status', emailController.deleteQueue);
// route.delete('/destroy_queue/:status', emailController.destroyQueue);
// route.delete('/destroy_jobs/:filter/:value', emailController.destroyJobs);

export { route };