import { FormProvider } from './context/FormContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FormProvider>
        <App />
      </FormProvider>
    </BrowserRouter>
  </React.StrictMode>
);
