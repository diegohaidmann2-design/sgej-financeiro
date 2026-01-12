<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contrato de Empréstimo #{{ $emprestimo->id }}</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .title { font-size: 24px; font-weight: bold; color: #2563eb; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #eee; margin-bottom: 10px; }
        .grid { width: 100%; border-collapse: collapse; }
        .grid td { padding: 5px 0; }
        .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #777; }
        .signature-box { margin-top: 80px; width: 100%; }
        .signature-line { border-top: 1px solid #000; width: 250px; margin: 0 auto; padding-top: 5px; }
        .table-parcelas { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .table-parcelas th, .table-parcelas td { border: 1px solid #eee; padding: 8px; text-align: left; font-size: 12px; }
        .table-parcelas th { bg-color: #f9fafb; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">CONTRATO DE EMPRÉSTIMO FINANCEIRO</div>
        <div>SGEJ - Sistema de Gestão de Empréstimos e Juros</div>
    </div>

    <div class="section">
        <div class="section-title">1. Identificação das Partes</div>
        <table class="grid">
            <tr>
                <td><strong>CREDOR:</strong> SGEJ Soluções Financeiras Ltda</td>
            </tr>
            <tr>
                <td><strong>DEVEDOR:</strong> {{ $emprestimo->cliente->nome }}</td>
            </tr>
            <tr>
                <td><strong>CPF/CNPJ:</strong> {{ $emprestimo->cliente->cpf_cnpj }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">2. Objeto do Contrato</div>
        <p>O presente contrato tem como objeto o empréstimo de capital nas seguintes condições:</p>
        <table class="grid">
            <tr>
                <td><strong>Valor Principal:</strong> R$ {{ number_format($emprestimo->valor_principal, 2, ',', '.') }}</td>
                <td><strong>Taxa de Juros:</strong> {{ $emprestimo->taxa_juros }}% ao mês</td>
            </tr>
            <tr>
                <td><strong>Método de Cálculo:</strong> {{ strtoupper($emprestimo->metodo_calculo) }}</td>
                <td><strong>Prazo:</strong> {{ $emprestimo->prazo_meses }} meses</td>
            </tr>
            <tr>
                <td><strong>Data de Início:</strong> {{ \Carbon\Carbon::parse($emprestimo->data_inicio)->format('d/m/Y') }}</td>
                <td><strong>Total a Pagar:</strong> R$ {{ number_format($emprestimo->parcelas->sum('valor_parcela'), 2, ',', '.') }}</td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">3. Cronograma de Pagamento</div>
        <table class="table-parcelas">
            <thead>
                <tr>
                    <th>Parcela</th>
                    <th>Vencimento</th>
                    <th>Valor da Parcela</th>
                    <th>Amortização</th>
                    <th>Juros</th>
                </tr>
            </thead>
            <tbody>
                @foreach($emprestimo->parcelas as $parcela)
                <tr>
                    <td>{{ $parcela->numero_parcela }}</td>
                    <td>{{ \Carbon\Carbon::parse($parcela->data_vencimento)->format('d/m/Y') }}</td>
                    <td>R$ {{ number_format($parcela->valor_parcela, 2, ',', '.') }}</td>
                    <td>R$ {{ number_format($parcela->valor_amortizacao, 2, ',', '.') }}</td>
                    <td>R$ {{ number_format($parcela->valor_juros, 2, ',', '.') }}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <div class="section">
        <div class="section-title">4. Disposições Gerais</div>
        <p style="font-size: 12px;">O atraso no pagamento de qualquer parcela sujeitará o DEVEDOR ao pagamento de multa moratória de 2% (dois por cento) sobre o valor da parcela, acrescido de juros de mora de 1% (um por cento) ao mês pro-rata die.</p>
    </div>

    <div class="signature-box">
        <table style="width: 100%;">
            <tr>
                <td style="text-align: center;">
                    <div class="signature-line">Assinatura do Credor</div>
                </td>
                <td style="text-align: center;">
                    <div class="signature-line">Assinatura do Devedor</div>
                </td>
            </tr>
        </table>
    </div>

    <div class="footer">
        Gerado eletronicamente em {{ date('d/m/Y H:i:s') }} por SGEJ
    </div>
</body>
</html>
