<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Relatório Financeiro - SGEJ</title>
    <style>
        body { font-family: 'Helvetica', sans-serif; color: #333; line-height: 1.6; font-size: 12px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #2563eb; padding-bottom: 10px; }
        .title { font-size: 20px; font-weight: bold; color: #2563eb; }
        .resumo-grid { width: 100%; margin-bottom: 30px; }
        .resumo-card { background: #f9fafb; padding: 15px; border: 1px solid #eee; text-align: center; }
        .resumo-label { font-size: 10px; font-weight: bold; color: #777; text-transform: uppercase; }
        .resumo-value { font-size: 16px; font-weight: bold; }
        .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .table th, .table td { border: 1px solid #eee; padding: 8px; text-align: left; }
        .table th { background: #f3f4f6; font-weight: bold; }
        .text-rose { color: #e11d48; }
        .text-emerald { color: #059669; }
        .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #999; }
    </style>
</head>
<body>
    <div class="header">
        <div class="title">RELATÓRIO FINANCEIRO CONSOLIDADO</div>
        <div>SGEJ - Sistema de Gestão de Empréstimos e Juros</div>
        <div style="margin-top: 5px;">Data de Referência: {{ $data_geracao }}</div>
    </div>

    <table class="resumo-grid">
        <tr>
            <td class="resumo-card">
                <div class="resumo-label">Total Emprestado</div>
                <div class="resumo-value">R$ {{ number_format($resumo['total_emprestado'], 2, ',', '.') }}</div>
            </td>
            <td class="resumo-card">
                <div class="resumo-label">Total Recebido</div>
                <div class="resumo-value text-emerald">R$ {{ number_format($resumo['total_recebido'], 2, ',', '.') }}</div>
            </td>
            <td class="resumo-card">
                <div class="resumo-label">Total em Atraso</div>
                <div class="resumo-value text-rose">R$ {{ number_format($resumo['total_atrasado'], 2, ',', '.') }}</div>
            </td>
        </tr>
    </table>

    <div style="margin-top: 20px;">
        <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px;">Detalhamento de Inadimplência (Parcelas Atrasadas)</h3>
        <table class="table">
            <thead>
                <tr>
                    <th>Vencimento</th>
                    <th>Cliente</th>
                    <th>Valor Original</th>
                    <th>Dias em Atraso</th>
                </tr>
            </thead>
            <tbody>
                @foreach($parcelas_atrasadas as $parc)
                <tr>
                    <td>{{ \Carbon\Carbon::parse($parc->data_vencimento)->format('d/m/Y') }}</td>
                    <td>{{ $parc->emprestimo->cliente->nome }}</td>
                    <td>R$ {{ number_format($parc->valor_parcela, 2, ',', '.') }}</td>
                    <td>{{ \Carbon\Carbon::parse($parc->data_vencimento)->diffInDays(now()) }} dias</td>
                </tr>
                @endforeach
                @if($parcelas_atrasadas->isEmpty())
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px; color: #999;">Nenhuma parcela em atraso no momento.</td>
                </tr>
                @endif
            </tbody>
        </table>
    </div>

    <div class="footer">
        Este documento é um relatório gerencial gerado automaticamente pelo sistema SGEJ.
    </div>
</body>
</html>
